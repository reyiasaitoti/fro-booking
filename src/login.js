// Modal Elements
  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.getElementById('open-login');
  const closeBtn = document.querySelector('.close');
  const loginBtn = document.getElementById('loginBtn');
  const loginError = document.getElementById('login-error');

  // Open Login Modal
  openLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
  });

  // Close Modal when X or outside of the modal is clicked
  closeBtn.onclick = () => {
    loginModal.style.display = 'none';
    loginError.textContent = ''; // Clear any error messages
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

    // Validate input
    if (!username || !password) {
      loginError.textContent = 'Both fields are required!';
      return;
    }

    try {

      const apiUrl = window.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      // Handle response
      if (!response.ok) {
        const errorText = await response.text(); // To catch HTML error messages
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();

      // Check if token is returned
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = `${apiUrl}/admin`; // Redirect to admin page
      } else {
        loginError.textContent = data.message || 'Invalid login credentials';
      }
    } catch (error) {
      console.error('Login failed:', error);
      loginError.textContent = 'Error logging in. Please try again.';
    }
  });