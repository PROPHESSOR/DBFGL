const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

const devmode = process.argv.includes('--devmode');
const livereload = process.argv.includes('--livereload');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 768,
        autoHideMenuBar: true
    });

    if (livereload) {
        window.loadURL('http://localhost:3000'); // TODO: Сделать полноценную livereload интеграцию
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