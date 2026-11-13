// ===== Тёмная тема =====
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
document.body.classList.add('dark');
themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
document.body.classList.toggle('dark');
const isDark = document.body.classList.contains('dark');
themeBtn.textContent = isDark ? '☀️' : '🌙';
localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== Бургер-меню =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
nav.classList.toggle('open');
});

// закрытие меню при клике по ссылке
nav.querySelectorAll('.nav__link').forEach(link => {
link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== Вкладки =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
btn.addEventListener('click', () => {
tabButtons.forEach(b => b.classList.remove('active'));
tabContents.forEach(c => c.classList.remove('active'));

btn.classList.add('active');
document.getElementById(btn.dataset.tab).classList.add('active');
});
});

// ===== Анимация прогресс-баров при появлении =====
const skillObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const fill = entry.target;
fill.style.width = fill.dataset.width + '%';
skillObserver.unobserve(fill);
}
});
}, { threshold: 0.3 });

document.querySelectorAll('.skill__fill').forEach(fill => {
skillObserver.observe(fill);
});

// ===== Валидация формы =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function setError(field, message) {
const input = document.getElementById(field);
const errorEl = document.querySelector([data-error="${field}"]);
if (message) {
input.classList.add('error');
errorEl.textContent = message;
} else {
input.classList.remove('error');
errorEl.textContent = '';
}
}

form.addEventListener('submit', (e) => {
e.preventDefault();
let valid = true;

const name = form.name.value.trim();
const email = form.email.value.trim();
const message = form.message.value.trim();

// Имя
if (name.length < 2) {
setError('name', 'Введите имя (минимум 2 символа)');
valid = false;
} else {
setError('name', '');
}

// Email (простая проверка)
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
if (!emailRegex.test(email)) {
setError('email', 'Введите корректный email');
valid = false;
} else {
setError('email', '');
}

// Сообщение
if (message.length < 10) {
setError('message', 'Сообщение должно быть не короче 10 символов');
valid = false;
} else {
setError('message', '');
}

if (valid) {
successMsg.classList.add('show');
form.reset();
setTimeout(() => successMsg.classList.remove('show'), 4000);
}
});

// ===== Кнопка «Наверх» =====
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
if (window.scrollY > 400) {
toTop.classList.add('show');
} else {
toTop.classList.remove('show');
}
});

toTop.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Плавное появление секций при скролле =====
const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
section.style.opacity = '0';
section.style.transform = 'translateY(30px)';
section.style.transition = 'opacity 0.6s, transform 0.6s';
sectionObserver.observe(section);
});