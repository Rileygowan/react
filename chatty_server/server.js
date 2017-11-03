const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer.Server({ server });

//BROADCAST TO ALL CONNECTED CLIENTS
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
  client.send(data);
  });
};

//COLOURS ARE ASSIGNED TO USERS ONCONNECT
var colors = {
  1: '#9B2335',
  2: '#DFCFBE',
  3: '#55B4B0',
  4: "#E15D44"
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  //OBJECT USED TO ASSIGN COLOUR TO USER
  let color = {
    type: 'color',
    color: colors[Math.floor(Math.random()*4)+1]
  };
  ws.send(JSON.stringify(color));

  //OBJECT TO BROADCAST TO USERS
  let users = {
    type: 'users',
    data: `${wss.clients.size} user(s) online`
  };
  wss.broadcast(JSON.stringify(users));

  //RECEIVE, SORT AND SEND MESSAGE
  ws.on('message', (message) => {
    const receipt = JSON.parse(message);
    switch(receipt.type) {
      case "postMessage":
        receipt.id = uuid();
        receipt.type = "incomingMessage";
        wss.broadcast(JSON.stringify(receipt));
        break;
      case "postNotification":
        receipt.id = uuid();
        receipt.type = "incomingNotification";
        wss.broadcast(JSON.stringify(receipt));
        break;
      default:
        console.log('Error time');
        throw new Error("Unknown event type " + data.type);
      }
    });


  ws.on('close', function close(error) {
    let usersRemaining = {
      type: 'users',
      data: `${wss.clients.size} user(s) online`
    };
    wss.broadcast(JSON.stringify(usersRemaining));
    console.log(error);
    console.log('Client disconnected');
  });
});