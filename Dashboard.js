// Auth check
if (!localStorage.getItem('currentUser')) window.location.href = '/';

document.getElementById('welcome').textContent = `Welcome, ${localStorage.getItem('currentUser')}!`;

let items = JSON.parse(localStorage.getItem('userItems') || '[]');

// Load sample data if empty
if (items.length === 0) {
    items = [
        {name: 'Sword', qty: 2, price: 50},
        {name: 'Shield', qty: 1, price: 75},
        {name: 'Potion', qty: 5, price: 10}
    ];
    localStorage.setItem('userItems', JSON.stringify(items));
}

function updateMetrics() {
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalValue = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const avgPrice = totalValue / totalItems || 0;
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById('avgPrice').textContent = `$${avgPrice.toFixed(2)}`;
    
    updateChart();
    updateTable();
}

function updateChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: items.map(i => i.name),
            datasets: [{ data: items.map(i => i.qty * i.price), backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ef4444'] }]
        }
    });
}

function updateTable() {
    const tbody = document.querySelector('#itemsTable tbody');
    tbody.innerHTML = items.map((item, i) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>$${item.price}</td>
            <td>$${(item.qty * item.price).toFixed(2)}</td>
            <td><button onclick="deleteItem(${i})">Delete</button></td>
        </tr>
    `).join('');
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
}

function addItem() {
    const name = prompt('Item name:');
    const qty = parseInt(prompt('Quantity:'));
    const price = parseFloat(prompt('Price:'));
    if (name && qty && price) {
        items.push({name, qty, price});
        localStorage.setItem('userItems', JSON.stringify(items));
        updateMetrics();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem('userItems', JSON.stringify(items));
    updateMetrics();
}

function filterItems() {
    const search = document.getElementById('search').value.toLowerCase();
    // Simple filter logic here
}

function logout() {
    localStorage.clear();
    window.location.href = '/';
}

updateMetrics();
