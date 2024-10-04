const { screen, app, BrowserWindow, globalShortcut } = require('electron');
const path = require('node:path');
const io = require('socket.io-client');
const { exec } = require('child_process');
const os = require('os');
const setupShortcuts = require('./helpers/shortcuts.js');

const webAddress = 'http://marketing.bep4than.online';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
// Kết nối tới server Socket.IO
const socket = io(webAddress);

const createWindow = () => {
  // Create the browser window.
  const displays = screen.getAllDisplays();
  const secondDisplay = displays[1] || displays[0];

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, './assets/icons/png/512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    fullscreen: true,
    x: secondDisplay.bounds.x, // X coordinate of the second display
    y: secondDisplay.bounds.y, // Y coordinate of the second display
  });

  // // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, '../dist/digital-signage-angular/browser/index.html'));

  // Xóa cache trước khi tải URL
  mainWindow.webContents.session.clearCache().then(() => {
    // Load a remote URL
    mainWindow.loadURL(webAddress).catch((err) => {
      console.error('Load URL is Error: ');
      console.error(err);
      mainWindow.loadFile(path.join(__dirname, '../dist/digital-signage-angular/browser/index.html')).catch((err) => {
        console.error('Load File is Error: ');
        console.error(err);
        mainWindow.loadFile(path.join(__dirname, './index.html'));
      });
    })
  });

  // Remove the menu bar
  mainWindow.setMenu(null);
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  // Lắng nghe sự kiện "new-front-end" từ server Socket.IO
  socket.on('update_frontend', () => {
    console.log('Received new-front-end event, reloading webContents...');
    mainWindow.webContents.reload();
  });

  // Lắng nghe sự kiện "reload_marketing4than.service" từ server Socket.IO
  socket.on('reload_marketing4than.service', () => {
    console.log('Received reload_marketing4than.service event, reloading marketing4than.service...');
    if (os.platform() === 'linux') {
      exec('systemctl reload marketing4than.service', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error reloading service: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  });

  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow();

  // Register global shortcuts
  setupShortcuts(mainWindow);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Unregister all global shortcuts when the app is about to quit
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
