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
 * https://wiki.zandronum.com/Launcher_protocol#Getting_the_list_of_servers
 */
export const responses = {
    // Errors
    MSC_IPISBANNED:     3,
    MSC_REQUESTIGNORED: 4,
    MSC_WRONGVERSION:   5,

    // Successful
    MSC_BEGINSERVERLISTPART: 6,
    MSC_ENDSERVERLISTPART:   7,
    MSC_SERVERBLOCK:         8,
};

const MSC = responses;

/**
 * @returns {Promise<{ip: string, port: number}[]>}
 */
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
                case MSC.MSC_IPISBANNED: return reject('Banned on master server');
                case MSC.MSC_REQUESTIGNORED: return reject('Too fast requests');
                case MSC.MSC_WRONGVERSION: return reject('Please update the launcher');
                case MSC.MSC_BEGINSERVERLISTPART: {
                    if (msg.readUInt8(5) !== MSC.MSC_SERVERBLOCK) return reject(`Expected MSC_SERVERBLOCK (8), got ${msg.readUInt8(5)}`);

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

                            serverList.push({ ip: ip.join('.'), port });
                            offset += 2;
                        }
                    } while (msg.readUInt8(offset) !== 0);

                    if (msg.readUInt8(++offset) === MSC.MSC_ENDSERVERLISTPART) {
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


/**
 * https://wiki.zandronum.com/Launcher_protocol#Querying_individual_servers
 */
export const serverFields = {
    SQF_NAME:              0x00000001,
    SQF_URL:               0x00000002,
    SQF_EMAIL:             0x00000004,
    SQF_MAPNAME:           0x00000008,
    SQF_MAXCLIENTS:        0x00000010,
    SQF_MAXPLAYERS:        0x00000020,
    SQF_PWADS:             0x00000040,
    SQF_GAMETYPE:          0x00000080,
    SQF_GAMENAME:          0x00000100,
    SQF_IWAD:              0x00000200,
    SQF_FORCEPASSWORD:     0x00000400,
    SQF_FORCEJOINPASSWORD: 0x00000800,
    SQF_GAMESKILL:         0x00001000,
    SQF_BOTSKILL:          0x00002000,
    SQF_LIMITS:            0x00010000,
    SQF_TEAMDAMAGE:        0x00020000,
    SQF_NUMPLAYERS:        0x00080000,
    SQF_PLAYERDATA:        0x00100000,
    SQF_TEAMINFO_NUMBER:   0x00200000,
    SQF_TEAMINFO_NAME:     0x00400000,
    SQF_TEAMINFO_COLOR:    0x00800000,
    SQF_TEAMINFO_SCORE:    0x01000000,
    SQF_TESTING_SERVER:    0x02000000,
    SQF_ALL_DMFLAGS:       0x08000000,
    SQF_SECURITY_SETTINGS: 0x10000000,
    SQF_OPTIONAL_WADS:     0x20000000,
    SQF_DEH:               0x40000000,
    SQF_EXTENDED_INFO:     0x80000000,
};

const SQF = serverFields;

const queryServerResponces = {
    ACCEPTED: 5660023,
    IGNORED:  5660024,
    BANNED:   5660025,
};

export const gameModes = {
    GAMEMODE_COOPERATIVE:     0,
    GAMEMODE_SURVIVAL:        1,
    GAMEMODE_INVASION:        2,
    GAMEMODE_DEATHMATCH:      3,
    GAMEMODE_TEAMPLAY:        4,
    GAMEMODE_DUEL:            5,
    GAMEMODE_TERMINATOR:      6,
    GAMEMODE_LASTMANSTANDING: 7,
    GAMEMODE_TEAMLMS:         8,
    GAMEMODE_POSSESSION:      9,
    GAMEMODE_TEAMPOSSESSION:  10,
    GAMEMODE_TEAMGAME:        11,
    GAMEMODE_CTF:             12,
    GAMEMODE_ONEFLAGCTF:      13,
    GAMEMODE_SKULLTAG:        14,
    GAMEMODE_DOMINATION:      15,
};

export const gameTypes = [
    'Cooperative', 'Survival', 'Invasion', 'DM',
    'Team Play', 'Duel', 'Terminator', 'LMS',
    'Team LMS', 'Possession', 'Team Possession', 'Team Game',
    'CTF', 'One Flag CTF', 'Skulltag', 'Domination',
];

/**
 *
 * @param {string} host
 * @param {number} port
 * @returns {Promise<{
    name: string,
    numPlayers: number,
    pwads: Array<string>,
    gameMode: {type: string, mode: number, instagib: boolean, buckshot: boolean},
    iwad: string,
    version: string}}
 */
export function getServerInfo(host, port) {
    // console.log(`fetchServerStatus ${host}:${port}`);

    return new Promise((res, rej) => {
        let done = false;

        const socket = dgram.createSocket('udp4');

        const fieldsToRequest = SQF.SQF_NAME | SQF.SQF_NUMPLAYERS | SQF.SQF_IWAD | SQF.SQF_PWADS | SQF.SQF_GAMETYPE;

        const rmessage = Buffer.alloc(16);

        const LAUNCHER_CHALLENGE_MAGIC = 199;

        rmessage.writeInt32LE(LAUNCHER_CHALLENGE_MAGIC, 0);
        rmessage.writeInt32LE(fieldsToRequest, 4);
        rmessage.writeInt32LE(~~(Date.now() / 1000), 8); // Current date to determine ping
        rmessage.writeInt32LE(0, 12); // Additional flags

        const reject = message => rej(done = true && new Error(message));

        socket.on('message', _msg => {
            const msg = huff.decode(_msg);

            const cursor = new ExtendedCursor(msg);

            const packetType = cursor.readUInt32LE();
            // eslint-disable-next-line no-unused-vars
            const time = cursor.readUInt32LE();

            switch (packetType) {
                case queryServerResponces.ACCEPTED: {
                    const version = cursor.readString();
                    const rflags = cursor.readUInt32LE(); // Available fields flags

                    const name = rflags & SQF.SQF_NAME ? cursor.readString() : 'unknown';

                    const pwads = [];

                    if (rflags & SQF.SQF_PWADS) {
                        const wadnum = cursor.readUInt8();

                        for (let i = 0; i < wadnum; i++) pwads.push(cursor.readString());

                    }

                    const gameMode = !(rflags & SQF.SQF_GAMETYPE) ? null : {
                        mode:     cursor.readUInt8(),
                        type:     gameTypes[cursor.seek('-', 1) && cursor.readUInt8()], // mode =D
                        instagib: Boolean(cursor.readUInt8()),
                        buckshot: Boolean(cursor.readUInt8()),
                    };

                    const iwad = rflags & SQF.SQF_IWAD ? cursor.readString() : null;

                    const numPlayers = rflags & SQF.SQF_NUMPLAYERS ? cursor.readUInt8() : -1;

                    done = true;

                    return res({
                        name,
                        numPlayers,
                        pwads,
                        gameMode,
                        iwad,
                        version,
                    });
                }
                case queryServerResponces.IGNORED: return reject('rate limit');
                case queryServerResponces.BANNED: return reject('ban-ip');
                default: return reject('unknown');
            }
        });

        const encoded = Buffer.from(huff.encode(rmessage));

        // console.log(encoded);
        socket.send(encoded, port, host, err => {
            if (err) {
                console.error(err);
                done = true;
                rej(err);
            }
        });

        setTimeout(() => {
            if (!done) {
                socket.close();
                rej(new Error('Time is out'));
            }
        }, TIMEOUT);
    });
}
