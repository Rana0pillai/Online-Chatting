const socket = io('http://localhost:2023')
let messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('container')

const username = prompt('Register your name');

const append = function(username, message, position) {
    // let messageElement = document.createElement('div')
    // messageElement.innerText = message
    // messageElement.classList.add('message')
    // messageElement.classList.add(position)
    // messageContainer.append(messageElement)
    let messageBox = `<div class="bg-gray-400 relative my-2 text-white p-2 rounded-lg lg:w-1/4 md:w-2/4 sm:w-2/4 float-${position} clear-both">
                        <span class="font-extrabold "> ${username ?? ''}:</span> 
                        <span class="font-serif font-thin">${message}</span>
                        <span class="absolute right-2 bottom-1 text-white font-light">${new Date().toLocaleTimeString()}</span>
                        </div>`

    messageContainer.innerHTML += messageBox;
}

socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(username, `Joined the chat`, `right`)
})

socket.on('recieve', data => {
    console.log("entered inside:::::::::::::>>", data)
    append(data.name, data.message, `left`)
})

socket.on('left', data => {
    console.log("left by:::::::::>>", data)
    append(data.name,` has left the chat`, `left`)
})

document.getElementById('input-form').addEventListener('submit', function(e) {
e.preventDefault()    
    append(`You: `, messageInput.value, `right`)
    socket.emit('send', messageInput.value);
e.target.reset();
})