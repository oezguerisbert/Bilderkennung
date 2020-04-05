const { app, BrowserWindow } = require('electron');



app.whenReady().then(() => {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    win.loadFile('./src/index.html');
});
