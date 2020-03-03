const path = require('path');

const { app, BrowserWindow } = require('electron');

const devmode = process.argv.includes('--devmode');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 768,
        autoHideMenuBar: true
    });

    window.loadURL(devmode ? 'http://localhost:3000' : path.join(__dirname, 'dist/index.html'));
    // TODO: Сделать полноценную livereload интеграцию

    if (devmode) window.webContents.openDevTools({ mode: 'detach' });
});

module.exports = app;