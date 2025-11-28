document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const portfolio = document.getElementById('portfolio');
    const authContainer = document.getElementById('auth-container');

    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const exitBtn = document.getElementById('exit-btn');

    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Check if user is logged in on page load
    if (localStorage.getItem('loggedInUser')) {
        showPortfolio();
    }

    // Toggle to register form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Toggle to login form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Register user
    registerBtn.addEventListener('click', function() {
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (!username || !password) {
            registerMessage.textContent = 'Please fill in all fields.';
            registerMessage.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            registerMessage.textContent = 'Passwords do not match.';
            registerMessage.style.color = 'red';
            return;
        }
        if (localStorage.getItem(username)) {
            registerMessage.textContent = 'Username already exists.';
            registerMessage.style.color = 'red';
            return;
        }

        localStorage.setItem(username, password);
        registerMessage.textContent = 'Registration successful! Please log in.';
        registerMessage.style.color = 'green';
        // Clear fields
        document.getElementById('register-username').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm-password').value = '';
    });

    // Login user
    loginBtn.addEventListener('click', function() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            localStorage.setItem('loggedInUser', username);
            showPortfolio();
        } else {
            loginMessage.textContent = 'Invalid username or password.';
            loginMessage.style.color = 'red';
        }
    });

    // Logout
    exitBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        showAuth();
    });

    function showPortfolio() {
        authContainer.style.display = 'none';
        portfolio.style.display = 'block';
    }

    function showAuth() {
        portfolio.style.display = 'none';
        authContainer.style.display = 'flex';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        // Clear messages
        loginMessage.textContent = '';
        registerMessage.textContent = '';
    }
});