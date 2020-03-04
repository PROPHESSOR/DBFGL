const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

const devmode = process.argv.includes('--devmode');
const livereload = process.argv.includes('--livereload');

/**
 * Открывает localhost:3000
 * Делает недоступными require функции
 */
const oldlivereload = process.argv.includes('--oldlivereload');

app.on('ready', () => {
    const window = new BrowserWindow({
        width:           1024,
        height:          768,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    if (oldlivereload) window.loadURL('http://localhost:3000');
    else if (livereload) window.loadFile('electron_live.html');
    else window.loadFile(path.join('index.html'));


    if (devmode) window.webContents.openDevTools({ mode: 'detach' });
});

module.exports = app;
