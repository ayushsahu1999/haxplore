const io = require("socket.io-client");

let socket = io.connect("http://localhost:7000");

socket.on("welcome", (data) => {
    console.log("Recieved: ",data);
});

