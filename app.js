const express = require("express");
const bodyParser = require('body-parser');
// Create an http server
const { createServer } = require("http");
//Add Socket.io package
const { Server } = require("socket.io");
// Require uuid for a custom session ID
const uuid = require("uuid");

// Create the app
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// Set up EJS
app.set('view engine', 'ejs');

// Set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/chat", (req, res) => {
    res.render("chat");
})
 

// Make a get request and generate a room Id
app.get("/generate-room-Id", (req, res) => {
    let roomId = uuid.v4()
    // Send the room Id to the ajax GET request
    res.status(200).send({"roomId": roomId});
});

// Connection with Socket.io
io.on("connection", (socket) => {
    // Connect with the socket on "join-room"
    socket.on("join-room", (name, roomId) => {
        console.log(name);
        console.log(roomId);
        socket.join(roomId);

        // After the connection is established, Emit a msg on the client side
        io.to(roomId).emit("user-connected", name);
    });
    // Connect with a socket on "message"
    socket.on("message", (name, roomId, msg) => {
        io.to(roomId).emit("received-msg", name, msg);
    })
  });

httpServer.listen(3000, () => {
    console.log("Servere listening on por 3000");
})