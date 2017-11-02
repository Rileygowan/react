// server.js

const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

//BROADCAST TO ALL CONNECTED CLIENTS
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    // }
  });
};

var colors = {
  1: '#9B2335',
  2: '#DFCFBE',
  3: '#55B4B0',
  4: "#E15D44"
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  let color = {
    type: 'color',
    color: colors[Math.floor(Math.random()*4)+1]
  }

  let users = {
    type: 'users',
    data: `${wss.clients.size} user(s) online`
  }

  wss.broadcast(JSON.stringify(users))
  ws.send(JSON.stringify(color))

  //RECEIVE MESSAGE FROM CLIENT
  ws.on('message', (message) => {
    const receipt = JSON.parse(message)
    switch(receipt.type) {
      case "postMessage":
        receipt.id = uuid();
        receipt.type = "incomingMessage"
        wss.broadcast(JSON.stringify(receipt));
        break;
      case "postNotification":
        receipt.id = uuid();
        receipt.type = "incomingNotification";
        wss.broadcast(JSON.stringify(receipt));
        break;
      default:
        console.log('Error time')
        throw new Error("Unknown event type " + data.type);
      }
    })

  //   console.log(newMessage)
  //   // console.log(`User ${newMessage.username} said ${newMessage.content}`);
  //   //RECOMPILE MESSAGE WITH ID
  //   newMessage.id = uuid();
  //   //REPLY TO CLIENTS
  //   wss.broadcast(JSON.stringify(newMessage))
  ws.on('close', function close(error) {
    let usersRemaining = {
      type: 'users',
      data: `${wss.clients.size} user(s) online`
    }
    wss.broadcast(JSON.stringify(usersRemaining))
    console.log(error)
    console.log('Client disconnected');
  });
});



// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });