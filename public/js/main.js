const chatForm = document.getElementById('chat-form');

const socket = io();

// Submit message
socket.on('message', message => {
  console.log(message);
  addMessageToDOM(message);
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  // Emit message to server
  socket.emit('userChatMessage', msg);
  e.target.elements.msg.value = '';
})

// Add sent message to DOM
function addMessageToDOM(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="msgInfo">${message.username}<span>${message.createdAt}</span></p>
  <p class="chatText">
    ${message.text}
  </p>`;
  document.querySelector('.chat-msgs').appendChild(div);
}