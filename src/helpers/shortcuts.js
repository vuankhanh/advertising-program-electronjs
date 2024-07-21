const { globalShortcut } = require('electron');

module.exports = function setupShortcuts(mainWindow) {
  // Đăng ký F11 để fullscreen cửa sổ
  globalShortcut.register('F11', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  // Đăng ký Esc để minimize cửa sổ
  globalShortcut.register('Esc', () => {
    mainWindow.minimize();
  });

  // Đăng ký Ctrl+D để bật/tắt DevTools
  globalShortcut.register('CommandOrControl+D', () => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools();
    }
  });
}