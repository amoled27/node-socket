const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    },
});
const cors = require('cors');
const linkedListNode = require('./models/linkedListModel.js');


mongoose.connect('mongodb+srv://xboost:xboost@cluster0.qqwq4.mongodb.net/socketio?retryWrites=true&w=majority', { useUnifiedTopology: true });

app.use(cors());
app.use(express.static(path.join(__dirname, 'react/build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'react/build', 'index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('nodeValue', (value) => {
        socket.broadcast.emit('node', value);
        const node = new linkedListNode({
            value: value
        });
        node.save().then(result => {
        });
    });
});

http.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`node server running on ${port}`);
    }
})