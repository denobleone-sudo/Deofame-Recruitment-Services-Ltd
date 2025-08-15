// Dark / light toggle
const toggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  toggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Counter animation
const counters = document.querySelectorAll('.count');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.dataset.target;
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          entry.target.textContent = target % 1 === 0 ? target : target.toFixed(1);
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(current);
        }
      }, 16);
      observer.unobserve(entry.target);
    }
  });
});
counters.forEach(c => observer.observe(c));
