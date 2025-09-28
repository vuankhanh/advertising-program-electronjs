const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const moment = require('moment');

let getMainWindow;
const app = express();
app.use(cors());
const server = http.createServer(app);

app.get('/', (req, res) => {
  console.log('Hello World!');
  console.log(moment(new Date()).format('HH:mm:ss'));
  res.send('Hello World!');
});

app.post('/the-new-payment', (req, res) => {
  const data = req.body;
  getMainWindow.webContents.send('transaction-success', data);
  console.log('Received example-event with data:', data);
  
  res.send('Ok!');
});

const io = new Server(server);

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${PORT}`);
});

module.exports = (mainWindow) => {
  getMainWindow = mainWindow;
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    socket.on('ping', (timestamp) => {
      console.log(`Received ping ${timestamp}`);
      socket.emit('pong', timestamp);
    })

    // Example event listener
    socket.on('the-new-payment', (data) => {
      mainWindow.webContents.send('transaction-success', data);
      console.log('Received example-event with data:', data);
    });
  });
};