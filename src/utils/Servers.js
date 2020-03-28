import DBFGL from '@/Global';
import Huffman from './huff';
import Config from '../utils/Config';

const dgram = require('dgram');
const { Buffer } = require('buffer');
const Cursor = require('cursor');

const huff = new Huffman();

const TIMEOUT = 10000;
const [HOST, PORT] = Config.get('servers:master:zandronum').split(':');

const ExtendedCursor = Cursor.extend({
    readString() {
        let str = '';

        while (true) {
            const charCode = this.readUInt8();

            if (charCode === 0) break;
            str += String.fromCharCode(charCode);
        }

        return str;
    },
});

/**
 * https://wiki.zandronum.com/Launcher_protocol
 */
export const responses = {
    MASTER_SERVER_VERSION: 2,

    // Errors
    MSC_IPISBANNED:     3,
    MSC_REQUESTIGNORED: 4,
    MSC_WRONGVERSION:   5,

    // Successful
    MSC_BEGINSERVERLISTPART: 6,
    MSC_ENDSERVERLISTPART:   7,
    MSC_SERVERBLOCK:         8,
};

export function getServers() {
    return new Promise((res, rej) => {
        let done = false; // Used to check timeout

        const socket = dgram.createSocket('udp4');

        function reject(message) {
            done = true;
            socket.close();

            return rej(new Error(message));
        }

        socket.on('message', _msg => {
            const msg = huff.decode(_msg);

            switch (msg.readUInt32LE(0)) {
                case responses.MSC_IPISBANNED: return reject('Banned on master server');
                case responses.MSC_REQUESTIGNORED: return reject('Too fast requests');
                case responses.MSC_WRONGVERSION: return reject('Please update the launcher');
                case responses.MSC_BEGINSERVERLISTPART: {
                    if (msg.readUInt8(5) !== responses.MSC_SERVERBLOCK) return reject(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt8(5)}`);

                    let offset = 6;

                    const serverList = [];

                    // Push IPs
                    do {
                        const size = msg.readUInt8(offset++);
                        const ip = [
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                        ];

                        // Parse ports for current IP
                        for (let i = 0; i < size; i++) {
                            const port = msg.readUInt16LE(offset);

                            serverList.push([ip, port]);
                            offset += 2;
                        }
                    } while (msg.readUInt8(offset) !== 0);

                    if (msg.readUInt8(++offset) === responses.MSC_ENDSERVERLISTPART) {
                        done = true;
                        socket.close();

                        console.log(`Got ${serverList.length} servers`);

                        return res(serverList);
                    }

                    return reject(`msg.readUInt8(offset) !== MSC_ENDSERVERLISTPART (7) ${msg.readUInt8(offset)}`);
                }
                default: return rej('Unknown error');
            }
        });


        const getServersMessage = Buffer.from([0x7C, 0x5D, 0x56, 0x00, 0x02, 0x00]);
        const encoded = Buffer.from(huff.encode(getServersMessage));

        socket.send(encoded, PORT, HOST, err => {
            if (err) return reject(err.message);
        });

        setTimeout(() => {
            if (!done) return reject('Time is out');

        }, TIMEOUT);
    });
}

export function fetchServerStatus(host, port) {
    // console.log(`fetchServerStatus ${host}:${port}`);

    return new Promise((resolve, reject) => {
        const socket = dgram.createSocket('udp4');
        let done = false;
        const rmessage = Buffer.alloc(16);

        rmessage.writeInt32LE(199, 0);
        rmessage.writeInt32LE(0x1, 4); // SQF_NAME
        rmessage.writeInt32LE(Math.floor(new Date().getTime() / 1000), 8); // SQF_NAME
        rmessage.writeInt32LE(0, 12); // SQF_NAME

        socket.on('message', _msg => {
            const msg = huff.decode(_msg);

            const cursor = new ExtendedCursor(msg);

            const packetType = cursor.readUInt32LE();
            // eslint-disable-next-line no-unused-vars
            const time = cursor.readUInt32LE();

            switch (packetType) {
                case 5660023: {
                    console.log(`server ip ${host}:${port} version ${cursor.readString()}`);
                    const rflags = cursor.readUInt32LE();

                    let serverName = 'unknown';

                    if (rflags & 0x1) serverName = cursor.readString();

                    console.log(`server name ${serverName}`);

                    done = true;
                    resolve({
                        name: serverName,
                    });
                }
                    break;
                case 5660024:
                    reject('rate limit');
                    break;
                case 5660025:
                    reject('ban-ip');
                    break;
                default:
                    done = true;
                    reject('unknown');
                    break;
            }
        });

        const encoded = Buffer.from(huff.encode(rmessage));

        // console.log(encoded);
        socket.send(encoded, port, host, err => {
            if (err) {
                console.error(err);
                done = true;
                reject(err);
            }
        });

        setTimeout(() => {
            if (!done) {
                socket.close();
                reject(new Error('Time is out'));
            }
        }, TIMEOUT);
    });
}
