document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      faqQuestions.forEach(other => {
        other.nextElementSibling.classList.remove('open');
        other.classList.remove('open');
      });
      if (!isOpen) {
        answer.classList.add('open');
        q.classList.add('open');
      }
    });
  });

  const filterSelects = document.querySelectorAll('.filter-bar select, .filter-bar input');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterSelects.length && projectCards.length) {
    filterSelects.forEach(el => {
      el.addEventListener('change', filterProjects);
      el.addEventListener('input', filterProjects);
    });
  }
  function filterProjects() {
    const typeFilter = document.getElementById('filter-type')?.value?.toLowerCase() || '';
    const locFilter = document.getElementById('filter-location')?.value?.toLowerCase() || '';
    const statusFilter = document.getElementById('filter-status')?.value?.toLowerCase() || '';
    projectCards.forEach(card => {
      const tags = card.querySelector('.project-tags')?.textContent?.toLowerCase() || '';
      const body = card.querySelector('.project-card-body')?.textContent?.toLowerCase() || '';
      const matchType = !typeFilter || tags.includes(typeFilter);
      const matchLoc = !locFilter || body.includes(locFilter);
      const matchStatus = !statusFilter || body.includes(statusFilter);
      card.style.display = (matchType && matchLoc && matchStatus) ? '' : 'none';
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
