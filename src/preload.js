// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

const versions = {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
}

const transactionSuccessMessage = {
  onMessage: (callback) => ipcRenderer.on('transaction-success', callback)
}

contextBridge.exposeInMainWorld('electron', {
  versions,
  transactionSuccessMessage
})