async function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const identifier = form.identifier.value.trim();
  const password = form.password.value;
  const errorMsg = document.getElementById('errorMsg');

  if (!identifier || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    errorMsg.style.display = 'block';
    return;
  }

  let loggedInOnline = false;
  let redirectUrl = '';
  let userName = '';
  let userEmail = '';

  // Try authenticating with WordPress REST API
  if (typeof prakhar_settings !== 'undefined' && prakhar_settings.rest_url) {
    try {
      const response = await fetch(prakhar_settings.rest_url + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': prakhar_settings.nonce
        },
        body: JSON.stringify({ identifier: identifier, password: password })
      });
      const result = await response.json();
      if (result.success) {
        loggedInOnline = true;
        redirectUrl = result.redirect_url;
        userName = result.user_name;
        userEmail = result.user_email;
      } else {
        errorMsg.textContent = result.message || 'Invalid credentials. Please try again.';
        errorMsg.style.display = 'block';
        setTimeout(() => errorMsg.style.display = 'none', 4000);
        return;
      }
    } catch (err) {
      console.warn('WordPress login failed, falling back to local storage auth simulation:', err);
    }
  }

  if (loggedInOnline) {
    // Save to local storage for site frontend sync
    localStorage.setItem('prakhar_logged_in', 'true');
    localStorage.setItem('prakhar_user_email', userEmail);
    localStorage.setItem('prakhar_user_name', userName);
    
    const loginLog = JSON.parse(localStorage.getItem('prakhar_login_log') || '[]');
    loginLog.push({ type: 'user', email: userEmail, name: userName, timestamp: new Date().toISOString() });
    localStorage.setItem('prakhar_login_log', JSON.stringify(loginLog));
    
    window.location.href = redirectUrl;
    return;
  }

  // Local storage simulation fallback (for static website testing)
  if (identifier === 'admin' && password === 'admin@123') {
    localStorage.setItem('prakhar_logged_in', 'true');
    localStorage.setItem('prakhar_user_email', 'admin@prakharind.com');
    localStorage.setItem('prakhar_user_name', 'Administrator');
    window.location.href = '/wp-admin/';
    return;
  }

  const users = JSON.parse(localStorage.getItem('prakhar_users') || '[]');
  const user = users.find(u => (u.email === identifier || u.mobile === identifier) && u.password === password);

  if (user) {
    localStorage.setItem('prakhar_logged_in', 'true');
    localStorage.setItem('prakhar_user_email', user.email);
    localStorage.setItem('prakhar_user_phone', user.mobile || '');
    localStorage.setItem('prakhar_user_name', (user.first_name || '') + ' ' + (user.last_name || ''));
    
    const loginLog = JSON.parse(localStorage.getItem('prakhar_login_log') || '[]');
    loginLog.push({ type: 'user', email: user.email, name: (user.first_name || '') + ' ' + (user.last_name || ''), timestamp: new Date().toISOString() });
    localStorage.setItem('prakhar_login_log', JSON.stringify(loginLog));
    window.location.href = '/';
  } else {
    errorMsg.textContent = 'Invalid credentials. Please check your email/phone and password.';
    errorMsg.style.display = 'block';
    setTimeout(() => errorMsg.style.display = 'none', 4000);
  }
}

function togglePassword(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
  }
}