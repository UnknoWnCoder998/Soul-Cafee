// NAV scroll shadow
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 30);
});

// Smooth scroll
function scroll2(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Time slot selection
let selectedTime = '';
function selectTime(btn) {
  document.querySelectorAll('.tslot').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedTime = btn.textContent;
  document.getElementById('f_time').value = selectedTime;
}

// Guest counter
let guests = 2;
function guestLabel(n) {
  if (n === 1) return 'гость';
  if (n >= 2 && n <= 4) return 'гостя';
  return 'гостей';
}
function changeGuests(d) {
  guests = Math.max(1, Math.min(20, guests + d));
  document.getElementById('guestCount').textContent = guests;
  document.getElementById('guestLabel').textContent = guestLabel(guests);
  document.getElementById('f_guests').value = guests;
}

// Form submit
function submitReservation() {
  const name  = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();
  const date  = document.getElementById('f_date').value;
  const time  = document.getElementById('f_time').value;
  if (!name)  { showToast('Пожалуйста, укажите ваше имя', false); return; }
  if (!phone) { showToast('Пожалуйста, укажите телефон', false); return; }
  if (!date)  { showToast('Выберите дату визита', false); return; }
  if (!time)  { showToast('Выберите удобное время', false); return; }

  const btn = document.querySelector('.fsub');
  btn.textContent = 'Отправляем...'; btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '🌿 Забронировать стол'; btn.disabled = false;
    showToast(`Бронь принята! ${name}, ждём вас ${date} в ${time} 🌿`);
    document.getElementById('f_name').value = '';
    document.getElementById('f_phone').value = '';
    document.getElementById('f_date').value = '';
    document.getElementById('f_note').value = '';
    document.querySelectorAll('.tslot').forEach(b => b.classList.remove('active'));
    selectedTime = '';
    guests = 2;
    document.getElementById('guestCount').textContent = 2;
    document.getElementById('guestLabel').textContent = 'гостя';
  }, 1400);
}

// Toast
function showToast(msg, ok = true) {
  document.getElementById('toastMsg').textContent = msg;
  const t = document.getElementById('toast');
  t.style.borderColor = ok ? 'var(--green)' : 'var(--terr)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5000);
}

// Hamburger
function toggleMenu() {
  const nl = document.querySelector('.nav-links');
  const open = nl.style.display === 'flex';
  nl.style.display = open ? 'none' : 'flex';
  if (!open) {
    nl.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:rgba(250,253,247,.98);border-bottom:1px solid rgba(74,122,58,.15);padding:1.5rem 6%;gap:1.25rem;z-index:99;backdrop-filter:blur(20px)';
  }
}

// Min date = today
const today = new Date().toISOString().split('T')[0];
document.getElementById('f_date').min = today;
