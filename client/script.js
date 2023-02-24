const socket = io('http://localhost:2023')
let messageInput = document.getElementById('message-input')
const messageContainer = document.querySelector('.container')

const username = prompt('Register your name');

const append = function(message, position) {
    let messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} Joined the chat`, `right`)
})

socket.on('recieve', data => {
    console.log("entered inside:::::::::::::>>", data)
    append(`${data.name}: ${data.message}`, `left`)
})

socket.on('left', data => {
    console.log("left by:::::::::>>", data)
    append(`${data} has left the chat`, `left`)
})

document.getElementById('send-btn').addEventListener('click', function() {
    
    append(`You: ${messageInput.value}`, `right`)
    socket.emit('send', messageInput.value);

})