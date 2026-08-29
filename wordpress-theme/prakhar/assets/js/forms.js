(function() {
  const SUBMISSIONS_KEY = 'prakhar_leads';

  function getLeads() {
    try { return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY)) || []; }
    catch { return []; }
  }

  function saveLead(type, data) {
    const leads = getLeads();
    const lead = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: type,
      data: data,
      source: window.location.pathname,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    leads.push(lead);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(leads));
    return lead;
  }

  function getPriority(type) {
    const map = {
      'manpower-urgent': 'Urgent',
      'manpower-bulk': 'High',
      'construction': 'Standard',
      'tender': 'High',
      'worker': 'Standard',
      'complaint': 'High',
      'contact': 'Standard'
    };
    return map[type] || 'Standard';
  }

  function getTeam(type) {
    const map = {
      'manpower-urgent': 'Manpower Operations',
      'manpower-bulk': 'Senior Operations Manager',
      'manpower': 'Manpower Operations',
      'construction': 'Estimation Team',
      'tender': 'Tender Team',
      'worker': 'Recruitment Team',
      'complaint': 'Compliance Manager',
      'contact': 'General Enquiries'
    };
    return map[type] || 'General Enquiries';
  }

  async function handleSubmit(form, type) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    let leadType = type;
    if (type === 'manpower') {
      if (data.workers && parseInt(data.workers) > 50) leadType = 'manpower-bulk';
      else if (data.required_date) {
        const days = Math.ceil((new Date(data.required_date) - new Date()) / (1000 * 60 * 60 * 24));
        if (days <= 7) leadType = 'manpower-urgent';
      }
    }

    let leadId = '';
    let priority = '';
    let team = '';

    // If running in WordPress and localized settings are available, submit to server
    if (typeof prakhar_settings !== 'undefined' && prakhar_settings.rest_url) {
      try {
        const response = await fetch(prakhar_settings.rest_url + 'lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': prakhar_settings.nonce
          },
          body: JSON.stringify({ type: leadType, data: data })
        });
        const result = await response.json();
        if (result.success) {
          leadId = result.lead_id;
          priority = result.priority;
          team = result.team;
        }
      } catch (err) {
        console.warn('WordPress lead submission failed, falling back to localStorage:', err);
      }
    }

    // Fallback to localStorage if submission failed or not in WordPress environment
    if (!leadId) {
      const lead = saveLead(leadType, data);
      leadId = lead.id;
      priority = getPriority(leadType);
      team = getTeam(leadType);
    }

    form.style.display = 'none';
    const success = form.parentElement.querySelector('.form-success');
    if (success) {
      success.classList.add('show');
      const idEl = success.querySelector('.lead-id');
      if (idEl) idEl.textContent = leadId;
      const teamEl = success.querySelector('.lead-team');
      if (teamEl) teamEl.textContent = team;
      const priorityEl = success.querySelector('.lead-priority');
      if (priorityEl) priorityEl.textContent = priority;
    }

    console.log(`[Prakhar Lead] ${leadType} | ID: ${leadId} | Team: ${team} | Priority: ${priority}`);
    return false;
  }

  document.querySelectorAll('[data-form]').forEach(form => {
    const type = form.getAttribute('data-form');
    const fileInputs = form.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
      input.addEventListener('change', () => {
        const maxSize = 10 * 1024 * 1024;
        Array.from(input.files).forEach(f => {
          if (f.size > maxSize) {
            alert('File too large. Maximum size is 10 MB.');
            input.value = '';
          }
        });
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      handleSubmit(form, type);
    });
  });

  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(inp => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.replace(/[^0-9+]/g, '');
    });
  });
})();
