console.log('server has been started on 2023')
const io = require('socket.io')(2023, {
    cors: {
        origin: '*',
    }
})
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {
                                            message: message, 
                                            name: users[socket.id]
                                        })
    })

    socket.on('disconnect', message =>{
        console.log("left by::::::>>", message)
        socket.broadcast.emit('left', {name: users[socket.id]})
        delete users[socket.id];
    })
})