const WebSocket = require('ws')
const jwt = require("jsonwebtoken")
const chatSchema = require("../models/chatSchema")
const socket = new WebSocket.Server({ port: 3000 });
// Executes when the connection is successfully established.
const connectionmap = new Map()
socket.on('connection', event => {
    console.log('WebSocket connection established!');
    // Sends a message to the WebSocket server.
    event.on("message", message => {
        let text = message.toString()
        try {
            const decoded = JSON.parse(text)
            const decodedtoken = jwt.verify(decoded.token, process.env.JWT_TOKEN)
            let chat = new chatSchema({
                message: decoded.data.chat,
                recieverId: decoded.id,
                senderId: decodedtoken.id
            })
            chat.save().then(() => {
                console.log(decoded.data.chat);
                const recev = connectionmap.get(decodedtoken.id)
                let data = JSON.stringify(chat.toJSON())
                recev.send(data)
                event.send(data)
            })
        }
        catch (error) {
            if (text.startsWith("id:")) {
                try {
                    const id = text.slice(3)
                    const decodedtoken = jwt.verify(id, process.env.JWT_TOKEN)
                    connectionmap.set(decodedtoken.id, event)
                }
                catch (e) {
                    console.log(e)
                }
            }
            console.log(error)
        }
        console.log(text);
        // Sends a message to the WebSocket server.
    })
});
// Executes when the connection is closed, providing the close code and reason.
socket.on('close', event => {
    console.log('WebSocket connection closed:', event.code, event.reason);
});
// Executes if an error occurs during the WebSocket communication.
socket.on('error', error => {
    console.error('WebSocket error:', error);
});

module.exports = socket