const http = require("http");
const app = require("./app");
let rooms = [];

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);//options,
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {

    socket.on('connection user data req',(data) => { 
      rooms.push(data.id);
      socket.join(data.id);
      socket.userId = data.id;
      io.emit('get-contact-response',rooms);
    }) 
  
    socket.on('get-contact', function() {
        io.emit('get-contact-response',rooms);
  });

  socket.on('sendMessage',(dataMessage) => {
    dataMessage.usersChat.forEach(user => {
      socket.to(user.id).emit('getNewMessage',{dataMessage :dataMessage.data, roomId : dataMessage.roomId});
    });
    
  })

  socket.on('delete-message-request',(dataMessage) => {
    dataMessage.usersChat.forEach(user => {
      io.to(user.id).emit('delete-message',{messageId :dataMessage.messageId});
    });
    
  })

  socket.on('send-notify',(data) => {
    io.to(data.idRecipient).emit('get notification',data);
  })


    socket.on("disconnect", () => {
      rooms = rooms.filter(function(room) { return room !== socket.userId })
      io.emit('get-contact-response',rooms);
    });

})


// httpRequest()
server.listen(
  process.env.PORT || 3000,
  console.log("Serveur listening in port : 3000")
);
