const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port= process.env.PORT || 3000;

// tell express where to find static web files
app.use(express.static('public')); //check in public folder

//app.get is a route handler

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');   //res.send for text
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});


//socket.io stuff goes here
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('connected', {sID: socket.id, message: 'new connection'}); //socket is handing them tbheir id, the person who connected
  // when event happens, passing these data with id


  // listen for incoming messages from Anyone connected to the chat service
  //and then see what the message is
  socket.on('chat_message', function(msg){
    console.log(msg);

    //step 2: show everyone whta was just sent through (send the mesage to everyone connected to the service) 
    io.emit('new_message', { message: msg});
  })

  // listen for a typing event and broadcast to all
  socket.on('user_typing', function(user){  //catch the custom event
    console.log(user);

    io.emit('typing', {currentlytyping: user })  //  throw/show it back
  })
});   