const form = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('message-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        await envoyerMessage(message);
        messageInput.value = '';
        afficherMessages();
    }
});

async function envoyerMessage(contenu) {
    await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenu })
    });
}

async function afficherMessages() {
    const response = await fetch('http://localhost:3000/api/messages');
    const messages = await response.json();
    messageList.innerHTML = messages.map(m => `
        <div class="message-item">${m.contenu}</div>
    `).join('');
}

// Charger les messages au démarrage
afficherMessages();
