const dgram = DBFGL.isNative ? require('dgram') : null;
const Buffer = DBFGL.isNative ? require('buffer').Buffer : null;

import DBFGL from '@/Global';
import Huffman from './huff';
import Config from '../utils/Config';

const huff = new Huffman();

const TIMEOUT = 10000;
const [HOST, PORT] = DBFGL.isNative ? Config.get('servers:master:zandronum').split(':') : ['127.0.0.1', '10666'];

export default () => new Promise((resolve, reject) => {
    if (!DBFGL.isNative) return reject(new Error('Не могу получить список серверов из браузера!'));

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
