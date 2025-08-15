/* Mobile nav toggle */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

/* Counter animation */
const counters = document.querySelectorAll('[data-count]');
const animate = el => {
  const target = +el.dataset.count;
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target % 1 === 0 ? target : target.toFixed(1);
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
};
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
});
counters.forEach(c => io.observe(c));

/* Form handlers (Formspree example) */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(form.action, { method:'POST', headers:{ 'Accept':'application/json' }, body:new FormData(form) })
      .then(()=>{ alert('Thank you! We’ll be in touch shortly.'); form.reset(); })
      .catch(()=>{ alert('Something went wrong—please call us instead.'); });
  });
});
