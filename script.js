const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'signup', username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message || 'Signup successful!'));
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('balance', data.balance);
            document.getElementById('auth').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('balance').innerText = `Balance: ${data.balance}`;
        } else {
            alert('Login failed!');
        }
    });
}

function logout() {
    localStorage.removeItem('userId');
    document.getElementById('auth').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function transfer() {
    const userId = localStorage.getItem('userId');
    const recipientId = document.getElementById('transfer-user-id').value;
    const currency = document.getElementById('transfer-currency').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'transfer', userId, recipientId, currency, amount }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Transfer successful!');
        document.getElementById('balance').innerText = `Balance: ${data.newBalance}`;
    });
}

function deposit() {
    const userId = localStorage.getItem('userId');
    const currency = document.getElementById('deposit-currency').value;
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'deposit', userId, currency, amount }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Deposit successful!');
        document.getElementById('balance').innerText = `Balance: ${data.newBalance}`;
    });
}

function buyCurrency() {
    const userId = localStorage.getItem('userId');
    const fromCurrency = document.getElementById('buy-from-currency').value;
    const toCurrency = document.getElementById('buy-to-currency').value;
    const amount = parseFloat(document.getElementById('buy-amount').value);
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'buyCurrency', userId, fromCurrency, toCurrency, amount }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Currency exchange successful!');
        document.getElementById('balance').innerText = `Balance: ${data.newBalance}`;
    });
}
