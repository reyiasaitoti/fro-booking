// Modal Elements
const loginModal = document.getElementById('loginModal');
const openLoginBtn = document.getElementById('open-login');
const closeBtn = document.querySelector('.close');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('login-error');

// Open Login Modal
openLoginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
  loginError.textContent = ''; // Clear errors when modal opens
});

// Close Modal when X or outside of the modal is clicked
closeBtn.onclick = () => {
  loginModal.style.display = 'none';
  loginError.textContent = ''; // Clear error messages
};

window.onclick = (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
    loginError.textContent = '';
  }
};

// Handle login form submission
loginBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    loginError.textContent = 'Both fields are required!';
    return;
  }

  try {
    const apiUrl = 'https://booking-8vpk.onrender.com'; // Hardcoded for now
    console.log('Sending login request to:', `${apiUrl}/api/admin/login`);

    const response = await fetch(`${apiUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', text);

    if (!response.ok) {
      loginError.textContent = 'Invalid credentials or server error.';
      return;
    }

    const data = JSON.parse(text);
    if (data.token) {
      console.log('Token received:', data.token);
      localStorage.setItem('token', data.token);
      window.location.href = '/admin.html';
    } else {
      loginError.textContent = data.message || 'Invalid login response.';
    }
  } catch (error) {
    console.error('Login failed:', error);
    loginError.textContent = 'Error logging in. Please try again.';
  }
});
