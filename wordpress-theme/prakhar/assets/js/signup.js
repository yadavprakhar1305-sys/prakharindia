async function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  const errorMsg = document.getElementById('errorMsg');

  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (form.password.value !== form.confirm_password.value) {
    errorMsg.textContent = 'Passwords do not match.';
    errorMsg.style.display = 'block';
    return;
  }

  const users = JSON.parse(localStorage.getItem('prakhar_users') || '[]');
  if (users.find(u => u.email === form.email.value)) {
    errorMsg.textContent = 'An account with this email already exists. Please sign in.';
    errorMsg.style.display = 'block';
    return;
  }
  if (users.find(u => u.mobile === form.mobile.value)) {
    errorMsg.textContent = 'An account with this phone number already exists. Please sign in.';
    errorMsg.style.display = 'block';
    return;
  }

  const userData = {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value,
    mobile: form.mobile.value,
    account_type: form.account_type.value,
    password: form.password.value,
    created: new Date().toISOString(),
    active: true
  };

  users.push(userData);
  localStorage.setItem('prakhar_users', JSON.stringify(users));

  const leadIdLocal = 'USR-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  const submissionData = {
    lead_id: leadIdLocal,
    full_name: (userData.first_name || '') + ' ' + (userData.last_name || ''),
    email: userData.email,
    mobile: userData.mobile,
    account_type: userData.account_type,
    registered: new Date().toLocaleDateString('en-IN')
  };

  let submittedOnline = false;

  // Submit registration as lead to WordPress REST API if settings exist
  if (typeof prakhar_settings !== 'undefined' && prakhar_settings.rest_url) {
    try {
      const response = await fetch(prakhar_settings.rest_url + 'lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': prakhar_settings.nonce
        },
        body: JSON.stringify({ type: 'user-registration', data: submissionData })
      });
      const result = await response.json();
      if (result.success) {
        submittedOnline = true;
      }
    } catch (err) {
      console.warn('WordPress registration log failed, falling back to localStorage:', err);
    }
  }

  if (!submittedOnline) {
    const leads = JSON.parse(localStorage.getItem('prakhar_leads') || '[]');
    leads.push({
      id: leadIdLocal,
      type: 'user-registration',
      status: 'new',
      source: '/signup/',
      timestamp: new Date().toISOString(),
      data: submissionData
    });
    localStorage.setItem('prakhar_leads', JSON.stringify(leads));
  }

  localStorage.setItem('prakhar_logged_in', 'true');
  localStorage.setItem('prakhar_user_email', form.email.value);
  localStorage.setItem('prakhar_user_phone', form.mobile.value);
  localStorage.setItem('prakhar_user_name', (userData.first_name || '') + ' ' + (userData.last_name || ''));

  document.getElementById('successMsg').style.display = 'block';
  form.style.display = 'none';
  setTimeout(() => window.location.href = '/', 1500);
}

function togglePW(id, btn) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
}