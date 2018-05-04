const dgram = DBFGL.isNative ? window.require('dgram') : null;

const Buffer = DBFGL.isNative ? window.require('buffer').Buffer : null;

import Huffman from './huff';

const huff = new Huffman();

export default (newServerCb, doneCb) => {
    if (!DBFGL.isNative) {
        return console.error('Must not be browser');
    }
    const HOST = 'master.zandronum.com';
    const PORT = 15300;
    const socket = dgram.createSocket('udp4');
    let done = false;
    const rmessage = Buffer.from([0x7C, 0x5D, 0x56, 0x00, 0x02, 0x00]);

    socket.on('message', (_msg) => {
        const msg = huff.decode(_msg);

        console.log(msg);

        if (msg.readUInt32LE(0) === 3) {
            console.error('Banned on master server');
            done = true;
            doneCb();
            socket.close();
        } else if (msg.readUInt32LE(0) === 4) {
            console.error('Too fast requests');
            done = true;
            doneCb();
            socket.close();
        } else if (msg.readUInt32LE(0) === 5) {
            console.error('Please update the launcher');
            done = true;
            doneCb();
            socket.close();
        } else if (msg.readUInt32LE(0) === 6) {
            if (msg.readUInt32LE(5) !== 8) {
                console.error(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt32LE(5)}`);
                done = true;
                doneCb();
                socket.close();
            }
            let offset = 6;

            for (;;) {
                if (msg.readUInt8(offset) === 0) {
                    offset++;
                    if (msg.readUInt8(offset) === 2) {
                        doneCb();
                        socket.close();
                    }

                    return;
                }
                const size = msg.readUInt8(offset++);
                const ip = [msg.readUInt8(offset++), msg.readUInt8(offset++), msg.readUInt8(offset++), msg.readUInt8(offset++)];

                for (let i = 0; i < size; i++) {
                    const port = msg.readUInt16LE(offset);

                    newServerCb(ip, port);
                    offset += 2;
                }
            }
        } else {
            console.error('Unknown error');
            done = true;
            doneCb();
            socket.close();
        }
    });
    const encoded = Buffer.from(huff.encode(rmessage));

    console.log(encoded);
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
    }, 10000);
};
