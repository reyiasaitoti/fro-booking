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
  loginError.textContent = ''; // Clear any previous errors

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validate input
  if (!username || !password) {
    loginError.textContent = 'Both fields are required!';
    return;
  }

  try {
    // Use window global for API base URL
    const apiUrl = window.VITE_API_URL || 'https://booking-8vpk.onrender.com'; 
    // Replace with your actual deployed backend URL

    const response = await fetch(`${apiUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Try to parse error JSON message
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // fallback to text if json parse fails
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      loginModal.style.display = 'none';
      // Redirect to admin portal (adjust URL if needed)
      window.location.href = '/admin'; 
    } else {
      loginError.textContent = data.message || 'Invalid login credentials';
    }
  } catch (error) {
    console.error('Login failed:', error);
    loginError.textContent = error.message || 'Error logging in. Please try again.';
  }
});
