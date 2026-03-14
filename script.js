// =============================================
//  LIAS CLEANING CO. — script.js
// =============================================

document.addEventListener(‘DOMContentLoaded’, () => {

// —– NAVBAR scroll effect —–
const nav = document.getElementById(‘nav’);
const onScroll = () => {
nav.classList.toggle(‘scrolled’, window.scrollY > 20);
};
window.addEventListener(‘scroll’, onScroll, { passive: true });
onScroll();

// —– HAMBURGER menu —–
const hamburger = document.getElementById(‘hamburger’);
const mobileMenu = document.getElementById(‘mobileMenu’);

hamburger?.addEventListener(‘click’, () => {
const isOpen = mobileMenu.classList.toggle(‘open’);
hamburger.setAttribute(‘aria-expanded’, isOpen);
// animate spans
const spans = hamburger.querySelectorAll(‘span’);
if (isOpen) {
spans[0].style.cssText = ‘transform: rotate(45deg) translate(5px, 5px)’;
spans[1].style.cssText = ‘opacity: 0; transform: translateX(-8px)’;
spans[2].style.cssText = ‘transform: rotate(-45deg) translate(5px, -5px)’;
} else {
spans.forEach(s => (s.style.cssText = ‘’));
}
});

// Close mobile menu when link clicked
document.querySelectorAll(’.mobile-link’).forEach(link => {
link.addEventListener(‘click’, () => {
mobileMenu.classList.remove(‘open’);
hamburger.querySelectorAll(‘span’).forEach(s => (s.style.cssText = ‘’));
});
});

// —– SCROLL REVEAL —–
const revealEls = document.querySelectorAll(’[data-reveal]’);
if (‘IntersectionObserver’ in window) {
const io = new IntersectionObserver(
(entries) => {
entries.forEach((entry, idx) => {
if (entry.isIntersecting) {
// Stagger siblings in the same parent
const siblings = […entry.target.parentElement.querySelectorAll(’[data-reveal]:not(.revealed)’)];
const delay = siblings.indexOf(entry.target) * 80;
setTimeout(() => {
entry.target.classList.add(‘revealed’);
}, delay);
io.unobserve(entry.target);
}
});
},
{ threshold: 0.1, rootMargin: ‘0px 0px -40px 0px’ }
);
revealEls.forEach(el => io.observe(el));
} else {
// Fallback for browsers without IntersectionObserver
revealEls.forEach(el => el.classList.add(‘revealed’));
}

// —– SMOOTH scroll for anchor links —–
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function (e) {
const target = document.querySelector(this.getAttribute(‘href’));
if (target) {
e.preventDefault();
const navH = nav.offsetHeight;
const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
window.scrollTo({ top, behavior: ‘smooth’ });
}
});
});

// —– QUOTE FORM submit —–
const form = document.getElementById(‘quoteForm’);
const successMsg = document.getElementById(‘formSuccess’);

form?.addEventListener(‘submit’, (e) => {
e.preventDefault();

```
// Basic validation
const required = form.querySelectorAll('[required]');
let valid = true;
required.forEach(field => {
  field.style.borderColor = '';
  if (!field.value.trim()) {
    field.style.borderColor = '#e05555';
    valid = false;
  }
});

if (!valid) {
  const first = form.querySelector('[required]:not([value]),[required][value=""]');
  first?.focus();
  return;
}

// Simulate submission (replace with real endpoint / EmailJS / Formspree)
const btn = form.querySelector('.btn--submit');
const btnText = btn.querySelector('.btn-text');
btnText.textContent = 'Sending...';
btn.disabled = true;

setTimeout(() => {
  form.reset();
  btnText.textContent = 'Request Quote';
  btn.disabled = false;
  successMsg.classList.add('visible');
  setTimeout(() => successMsg.classList.remove('visible'), 6000);
}, 1200);
```

});

// —– PHONE number formatting —–
const phoneInput = document.getElementById(‘phone’);
phoneInput?.addEventListener(‘input’, (e) => {
const digits = e.target.value.replace(/\D/g, ‘’).slice(0, 10);
if (digits.length >= 6) {
e.target.value = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
} else if (digits.length >= 3) {
e.target.value = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
} else {
e.target.value = digits;
}
});

// —– Active nav link highlight —–
const sections = document.querySelectorAll(‘section[id]’);
const navLinks = document.querySelectorAll(’.nav__links a:not(.nav__cta)’);

const highlightNav = () => {
const scrollY = window.scrollY + nav.offsetHeight + 40;
sections.forEach(section => {
if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
navLinks.forEach(link => {
link.style.color = ‘’;
if (link.getAttribute(‘href’) === `#${section.id}`) {
link.style.color = ‘var(–sky)’;
}
});
}
});
};
window.addEventListener(‘scroll’, highlightNav, { passive: true });
highlightNav();

});
