const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    const window = new BrowserWindow({
        width: 1024,
        height: 768
    });
    
    window.loadURL('http://localhost:3000'); // TODO: Сделать нормально
});

module.exports = app;