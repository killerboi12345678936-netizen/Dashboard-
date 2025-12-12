if (localStorage.getItem('currentUser')) window.location.href = '/dashboard.html';

document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = '/dashboard.html';
    } else {
        message.textContent = 'Invalid credentials';
        message.style.color = '#ef4444';
    }
});
