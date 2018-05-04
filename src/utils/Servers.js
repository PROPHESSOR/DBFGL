const dgram = DBFGL.isNative ? window.require('dgram') : null;
const Buffer = DBFGL.isNative ? window.require('buffer').Buffer : null;

import Huffman from './huff';
import Config from '../utils/Config';

const huff = new Huffman();

const TIMEOUT = 10000;
const [HOST, PORT] = Config.get('servers:master:zandronum').split(':');

/** Получает список серверов
 * @param  {function} newServerCb - Хрен пойми, для чего нужный коллбэк
 * @param  {function} doneCb - Ещё один какой-то коллбэк. Зачем?
 * @returns {undefined} Оригинально
 */
export default (newServerCb, doneCb) => {
    if (!DBFGL.isNative) {
        return console.warn('Не могу получить список серверов из браузера!');
    }

    return new Promise((resolve, reject) => {
        const socket = dgram.createSocket('udp4');
        let done = false;
        const rmessage = Buffer.from([0x7C, 0x5D, 0x56, 0x00, 0x02, 0x00]);

        socket.on('message', (_msg) => {
            const msg = huff.decode(_msg);

            // console.log(msg);

            switch (msg.readUInt32LE(0)) {
                case 3:
                    console.error('Banned on master server');
                    done = true;
                    doneCb();
                    socket.close();
                    break;
                case 4:
                    console.error('Too fast requests');
                    done = true;
                    doneCb();
                    socket.close();
                    break;
                case 5:
                    console.error('Please update the launcher');
                    done = true;
                    doneCb();
                    socket.close();
                    break;
                case 6:
                {
                    if (msg.readUInt32LE(5) !== 8) {
                        console.error(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt32LE(5)}`);
                        done = true;
                        doneCb();
                        socket.close();

                        return;
                    }
                    let offset = 6;

                    while (true) {
                        if (msg.readUInt8(offset) === 0) {
                            offset++;
                            if (msg.readUInt8(offset) === 2) {
                                doneCb();
                                socket.close();
                            }

                            return;
                        }
                        const size = msg.readUInt8(offset++);
                        const ip = [
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++),
                            msg.readUInt8(offset++)
                        ];

                        for (let i = 0; i < size; i++) {
                            const port = msg.readUInt16LE(offset);

                            newServerCb(ip, port);
                            offset += 2;
                        }
                    }
                }
                default:
                    console.error('Unknown error');
                    done = true;
                    doneCb();
                    socket.close();
                    break;
            }
        });
        const encoded = Buffer.from(huff.encode(rmessage));

        // console.log(encoded);
        socket.send(encoded, PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                done = true;
                doneCb();
            }
        });
        setTimeout(() => {
            if (!done) {
                socket.close();
                doneCb();
            }
        }, TIMEOUT);
    });
};
