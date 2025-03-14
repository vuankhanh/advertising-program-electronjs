const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${PORT}`);
});

module.exports = (mainWindow) => {
  // const payments = [
  //   { amount: 24000 },
  //   { amount: 104000 },
  //   { amount: 96000 },
  //   { amount: 5000 }
  // ];

  // setTimeout(() => {
  //   for (const payment of payments) {
  //     mainWindow.webContents.send('transaction-success', payment);
  //   }
  // }, 5000);
  

  // setTimeout(() => {
  //   mainWindow.webContents.send('transaction-success', { amount: 50000});
  // }, 40000);

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    // Example event listener
    socket.on('the-new-payment', (data) => {
      mainWindow.webContents.send('transaction-success', data);
      console.log('Received example-event with data:', data);
    });
  });
};