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
        width: 1024,
        height: 768,
        autoHideMenuBar: true
    });

    if (oldlivereload) {
        window.loadURL('http://localhost:3000');
    } else if (livereload) {
        window.loadURL(url.format({
            pathname: path.join(__dirname, 'electron_live.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        window.loadURL(url.format({
            pathname: path.join(__dirname, 'build/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    if (devmode) window.webContents.openDevTools({ mode: 'detach' });
});

module.exports = app;