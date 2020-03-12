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

export function pingServers() {
    return new Promise((resolve, reject) => {
        const socket = dgram.createSocket('udp4');
        let done = false;
        const rmessage = Buffer.from([0x7C, 0x5D, 0x56, 0x00, 0x02, 0x00]);

        socket.on('message', _msg => {
            const msg = huff.decode(_msg);

            // console.log(msg);

            switch (msg.readUInt32LE(0)) {
                case 3:
                    console.error('Banned on master server');
                    done = true;
                    reject(new Error('Banned on master server'));
                    socket.close();
                    break;
                case 4:
                    console.error('Too fast requests');
                    done = true;
                    reject(new Error('Too fast requests'));
                    socket.close();
                    break;
                case 5:
                    console.error('Please update the launcher');
                    done = true;
                    reject(new Error('Please update the launcher'));
                    socket.close();
                    break;
                case 6:
                {
                    if (msg.readUInt8(5) !== 8) {
                        console.error(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt32LE(5)}`);
                        done = true;
                        reject(new Error(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt32LE(5)}`));
                        socket.close();

                        return;
                    }
                    let offset = 6;

                    const serverList = [];

                    while (true) {
                        if (msg.readUInt8(offset) === 0) {
                            offset++;
                            if (msg.readUInt8(offset) === 2) {
                                done = true;
                                resolve(serverList);
                                socket.close();
                            }

                            return;
                        }
                        const size = msg.readUInt8(offset++);
                        const ip = [
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                        ];

                        for (let i = 0; i < size; i++) {
                            const port = msg.readUInt16LE(offset);

                            serverList.push([ip, port]);
                            offset += 2;
                        }
                    }
                }
                default:
                    console.error('Unknown error');
                    done = true;
                    reject(new Error('Unknown error'));
                    socket.close();
                    break;
            }
        });
        const encoded = Buffer.from(huff.encode(rmessage));

        // console.log(encoded);
        socket.send(encoded, PORT, HOST, err => {
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

export function fetchServerStatus(host, port) {
    console.log(`fetchServerStatus ${host}:${port}`);

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
