const express = require("express")
const socketIo = require("socket.io")
const http = require("http")
const PORT = process.env.PORT || 10000
const app = express()
const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001", "https://msmcsd.github.io"]
    }
}) //in case server and client run on different urls

io.on("connection",(socket)=>{
    //console.log("Client connected:", socket.id)
	log_status(io.engine.clientsCount, socket.id, "Connection", "Client connected")

    socket.join("clock-room")

    socket.on("disconnect", (reason)=>{
		log_status(io.engine.clientsCount, socket.id, "Disconnect", reason)
    })
    
    socket.on("Error", data => {
        log_status(io.engine.clientsCount, socket.id, "Error", data)
        io.emit("Error", data);
    })

    socket.on("Info", data => {
        log_status(io.engine.clientsCount, socket.id, "Info", data)
        io.emit("Info", data);
    })

    socket.on("Parameters", data => {
        log_status(io.engine.clientsCount, socket.id, "Parameters", data)
        io.emit("Parameters", data);
    })

    socket.on("Progress", data => {
        log_status(io.engine.clientsCount, socket.id, "Progress", data)
        io.emit("Progress", data);
    })

    socket.on("Report", data => {
        log_status(io.engine.clientsCount, socket.id, "Report", data)
        io.emit("Report", data);
    })
})

// setInterval(() => {
//      io.to("clock-room").emit("time", new Date())
// }, 1000)

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log("Server running on port", PORT)
})

function log_status(client_count, socketId, message_type, message) {
	var datetime = new Date().toLocaleString('en-US', { timeZone: process.env.TZ });
	console.log("[%s][%s][%s][%s] %s", datetime, client_count, socketId, message_type, message);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});