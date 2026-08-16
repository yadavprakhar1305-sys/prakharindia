function handleLogin(e) {
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

  const loginLog = JSON.parse(localStorage.getItem('prakhar_login_log') || '[]');

  if (identifier === 'admin' && password === 'admin@123') {
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