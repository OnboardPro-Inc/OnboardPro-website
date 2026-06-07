// ── OnboardPro App Logic ──

// ── SCREEN SWITCHING (login / signup / app) ──
function showScreen(id) {
  document.querySelectorAll('.screen-full').forEach(s => s.style.display = 'none');
  document.getElementById('app-shell').style.display = 'none';

  if (id === 'dashboard') {
    document.getElementById('app-shell').style.display = 'flex';
    showMain('dashboard');
  } else if (id === 'login-screen') {
    document.getElementById('login-screen').style.display = 'flex';
  } else if (id === 'signup') {
    document.getElementById('signup-screen').style.display = 'flex';
  }
}

// ── MAIN PAGE SWITCHING (inside app) ──
function showMain(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  const navLink = document.querySelector('[data-page="' + page + '"]');
  if (navLink) navLink.classList.add('active');
}

// ── SHOW EMPLOYEE PROFILE ──
function showProfile(name) {
  const initials = name.split(' ').map(w => w[0]).join('');
  document.getElementById('profile-title').textContent = name;
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-avatar').textContent = initials;
  document.getElementById('poe-emp-name').textContent = name;
  showMain('profile');
}

// ── SEND ONBOARDING LINK ──
function sendLinkAlert() {
  const contact = document.getElementById('send-contact').value;
  const name = document.getElementById('send-name').value || 'employee';
  const site = document.getElementById('send-site').value;
  if (!contact) { showToast('Please enter a phone or email'); return; }
  showToast('✓ Onboarding link sent to ' + name + ' for ' + site);
  document.getElementById('send-contact').value = '';
  document.getElementById('send-name').value = '';
}

// ── CONTRACT DURATION SELECTION ──
function selectDur(btn) {
  btn.closest('.duration-btns').querySelectorAll('.dur-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ── APPROVE CONTRACT ──
function approveContract() {
  const box = document.getElementById('hr-sig');
  box.innerHTML = `
    <div class="sig-label">HR Admin</div>
    <div class="sig-name">Acme Labour Co.</div>
    <small>Signed just now</small>
  `;
  box.style.background = '#EAF3DE';
  box.style.borderColor = '#97C459';
  showToast('✓ Contract approved and signed! Employee notified.');
  setTimeout(() => showMain('contracts'), 1800);
}

// ── PRINT POE ──
function printPOE(name) {
  if (name && name !== 'current') {
    document.getElementById('poe-emp-name').textContent = name;
    const initials = name.split(' ').map(w => w[0]).join('');
    document.getElementById('poe-sub').textContent = name + ' · Tharisa Mine, Steelpoort';
  }
  document.getElementById('poe-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closePOE() {
  document.getElementById('poe-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// ── FILTER TABLE ──
function filterTable(val) {
  const rows = document.querySelectorAll('#emp-table tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
  });
}

// ── SITES ──
function showAddSiteModal() {
  document.getElementById('site-modal').style.display = 'flex';
}
function closeSiteModal() {
  document.getElementById('site-modal').style.display = 'none';
}
function addSite() {
  const name = document.getElementById('new-site-name').value;
  const loc = document.getElementById('new-site-loc').value;
  if (!name || !loc) { showToast('Please fill in site name and location'); return; }

  const list = document.getElementById('sites-list');
  const row = document.createElement('div');
  row.className = 'site-row';
  row.innerHTML = `
    <div class="site-icon"><i class="ti ti-building-factory"></i></div>
    <div class="site-info">
      <div class="site-name">${name} <span class="badge green">Active</span></div>
      <div class="site-detail">${loc} · 0 employees deployed</div>
    </div>
    <div class="site-actions">
      <button class="btn btn-sm"><i class="ti ti-users"></i> View staff</button>
      <button class="btn btn-sm"><i class="ti ti-edit"></i> Edit</button>
    </div>
  `;
  list.appendChild(row);
  closeSiteModal();
  showToast('✓ Site "' + name + '" added successfully!');
  document.getElementById('new-site-name').value = '';
  document.getElementById('new-site-loc').value = '';
}

// ── PLAN SELECTION ──
function selectPlan(el, plan) {
  document.querySelectorAll('.mini-plan').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// ── CLOSE MODALS ON OUTSIDE CLICK ──
document.addEventListener('click', function(e) {
  const siteModal = document.getElementById('site-modal');
  if (e.target === siteModal) closeSiteModal();
  const poeModal = document.getElementById('poe-modal');
  if (e.target === poeModal) closePOE();
});

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePOE();
    closeSiteModal();
  }
});
