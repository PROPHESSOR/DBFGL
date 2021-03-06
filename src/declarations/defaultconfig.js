/* eslint-disable quotes, comma-dangle, key-spacing, semi, no-undef */

const waddir = process.env.DOOMWADDIR || "{appdata}/wads";

export default {
    "wads": {
        "folders": [
            waddir
        ],
        "finder": {
            "urls": [
                "http://static.allfearthesentinel.net/wads/",
                "http://doomshack.org/wads/"
            ],
            "folder": waddir
        },
        "aliases": {
            "doom.wad": [
                "freedomu.wad",
                "freedoom1.wad"
            ],
            "doom2.wad": [
                "freedoom.wad",
                "freedoom2.wad"
            ],
            "plutonia.wad": [
                "freedoom.wad",
                "freedoom2.wad"
            ],
            "tnt.wad": [
                "freedoom.wad",
                "freedoom2.wad"
            ]
        }
    },
    "servers": {
        "master": {
            "zandronum": "master.zandronum.com:15300"
        },
        "favorite": [
            "127.0.0.1"
        ]
    },
    "collections": [
        {
            "name": "Test",
            "iwad": "doom2.wad",
            "wads": [
                "brutalv21.pk3"
            ]
        }
    ],
    "ports": [
        {
            "name": "GZDoom",
            "description": "(G)ZDoom",
            "path": "gzdoom",
            "argformat": "zdoom",
            "supportPk3": true,
            "supportPk7": true,
            "supportDecorate": true,
            "supportMultiplayer": true,
            "support3dFloors": true,
            "supportDeHacked": true,
            "supportZandronumServers": false
        },
        {
            "name": "Zandronum",
            "description": "Client-Server Source Port",
            "path": "zandronum",
            "argformat": "zdoom",
            "supportPk3": true,
            "supportPk7": true,
            "supportDecorate": true,
            "supportMultiplayer": true,
            "support3dFloors": true,
            "supportDeHacked": true,
            "supportZandronumServers": true
        },
        {
            "name": "QZDoom",
            "description": "",
            "path": "qzdoom",
            "argformat": "zdoom",
            "supportPk3": true,
            "supportPk7": true,
            "supportDecorate": true,
            "supportMultiplayer": true,
            "support3dFloors": true,
            "supportDeHacked": true,
            "supportZandronumServers": false
        },
        {
            "name": "LZDoom",
            "description": "",
            "path": "lzdoom",
            "argformat": "zdoom",
            "supportPk3": true,
            "supportPk7": true,
            "supportDecorate": true,
            "supportMultiplayer": true,
            "support3dFloors": true,
            "supportDeHacked": true,
            "supportZandronumServers": false
        },
        {
            "name": "PRBoom +",
            "description": "PRBoom-Plus",
            "path": "prboom-plus",
            "argformat": "boom",
            "supportPk3": false,
            "supportPk7": false,
            "supportDecorate": false,
            "supportMultiplayer": true,
            "support3dFloors": false,
            "supportDeHacked": false,
            "supportZandronumServers": false
        },
        {
            "name": "Chocolate Doom",
            "description": "Vanilla-Like Source port",
            "path": "chocolate-doom",
            "argformat": "vanilla",
            "supportPk3": false,
            "supportPk7": false,
            "supportDecorate": false,
            "supportMultiplayer": true,
            "support3dFloors": false,
            "supportDeHacked": false,
            "supportZandronumServers": false
        },
        {
            "name": "Doom (1993)",
            "description": "Vanilla DooM",
            "path": "doom",
            "argformat": "vanilla",
            "supportPk3": false,
            "supportPk7": false,
            "supportDecorate": false,
            "supportMultiplayer": false,
            "support3dFloors": false,
            "supportDeHacked": false,
            "supportZandronumServers": false
        },
        {
            "name": "Doom 2 (1994)",
            "description": "Doom II: Hell on Earth",
            "path": "doom2",
            "argformat": "vanilla",
            "supportPk3": false,
            "supportPk7": false,
            "supportDecorate": false,
            "supportMultiplayer": false,
            "support3dFloors": false,
            "supportDeHacked": false,
            "supportZandronumServers": false
        }
    ],
    "unused$theme": {
        "theme": "default",
        "colors": {
            "primary1Color": "green500",
            "primary2Color": "green700",
            "primary3Color": "grey400",
            "accent1Color": "blueA200",
            "accent2Color": "grey800",
            "accent3Color": "grey500",
            "textColor": "fullWhite",
            "secondaryTextColor": "rgba(255, 255, 255, 0.7)",
            "alternateTextColor": "white",
            "canvasColor": "#303030",
            "borderColor": "grey300",
            "disabledColor": "rgba(0, 0, 0, 0.3)",
            "pickerHeaderColor": "green500",
            "clockCircleColor": "rgba(0, 0, 0, 0.07)",
            "shadowColor": "fullBlack"
        }
    }
}
