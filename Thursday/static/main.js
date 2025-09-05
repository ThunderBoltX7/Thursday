// Theme toggle and persistence
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const root = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
    themeLabel.innerText = 'Dark';
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeLabel.innerText = 'Dark';
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeLabel.innerText = 'Light';
    }
});

// Chat message handling
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;
    msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = userInput.value.trim();
    if (!msg) return;
    appendMessage('user', msg);
    userInput.value = '';
    appendMessage('bot', '...');
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: msg})
        });
        const data = await response.json();
        // Replace '...' with actual response
        messages.lastChild.remove();
        appendMessage('bot', data.response);
    } catch (error) {
        messages.lastChild.remove();
        appendMessage('bot', "Sorry, something went wrong!");
    }
});
