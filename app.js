// ── OnboardPro App Logic ──

// ── SCREEN SWITCHING ──
function showScreen(id) {
  document.querySelectorAll('.screen-full').forEach(s => s.style.display = 'none');
  const app = document.getElementById('app-shell');
  app.style.display = 'none';
  if (id === 'app') {
    app.style.display = 'flex';
    showPage('dashboard');
  } else {
    const el = document.getElementById(id + '-screen') || document.getElementById(id);
    if (el) el.style.display = 'flex';
  }
}

// ── PAGE SWITCHING ──
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  const nav = document.querySelector('[data-page="' + page + '"]');
  if (nav) nav.classList.add('active');
}

// ── EMPLOYEE PROFILE ──
function showProfile(name, dept, status) {
  const initials = name.split(' ').map(w => w[0]).join('');
  document.getElementById('profile-title').textContent = name;
  document.getElementById('profile-name-text').textContent = name;
  document.getElementById('profile-sub').textContent = dept + ' Department · ' + status;
  document.getElementById('profile-avatar').textContent = initials;
  document.getElementById('poe-emp-name').textContent = name;
  document.getElementById('poe-name-field').textContent = name;
  document.getElementById('poe-sub').textContent = name + ' · ' + dept + ' Department';
  showPage('profile');
}

// ── SEND LINK ──
function sendLinkAction() {
  const contact = document.getElementById('send-contact').value;
  const name = document.getElementById('send-name').value || 'new employee';
  if (!contact) { showToast('Please enter a phone number or email'); return; }
  showToast('✓ Onboarding link sent to ' + name + '!');
  document.getElementById('send-contact').value = '';
  document.getElementById('send-name').value = '';
}

// ── APPROVE CONTRACT ──
function approveContract() {
  const box = document.getElementById('hr-sig');
  box.innerHTML = '<div class="sig-label">HR Admin</div><div class="sig-name">Retail Chain SA</div><small>Signed just now ✓</small>';
  box.style.background = '#EAF3DE';
  box.style.borderColor = '#97C459';
  box.style.borderStyle = 'solid';
  showToast('✓ Contract approved and signed! Employee notified.');
  setTimeout(() => showPage('contracts'), 1800);
}

// ── PRINT POE ──
function printPOE(name) {
  if (name && name !== 'current') {
    document.getElementById('poe-emp-name').textContent = name;
    document.getElementById('poe-name-field').textContent = name;
    document.getElementById('poe-sub').textContent = name + ' · Employee file';
  }
  document.getElementById('poe-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closePOE() {
  document.getElementById('poe-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// ── FILTER TABLE ──
function filterTable(val, tableId) {
  const rows = document.querySelectorAll('#' + tableId + ' tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
  });
}

// ── SITES ──
function showSiteModal() {
  const m = document.getElementById('site-modal');
  m.style.display = 'flex';
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
    </div>`;
  list.appendChild(row);
  closeSiteModal();
  showToast('✓ Site "' + name + '" added!');
  document.getElementById('new-site-name').value = '';
  document.getElementById('new-site-loc').value = '';
}

// ── LEAVE MODAL ──
function showLeaveModal() {
  document.getElementById('leave-modal').style.display = 'flex';
}
function closeLeaveModal() {
  document.getElementById('leave-modal').style.display = 'none';
}
function submitLeave() {
  closeLeaveModal();
  showToast('✓ Leave request submitted for approval');
}

// ── TRACK SELECTION ──
function selectTrack(track) {
  document.getElementById('track-lb').classList.remove('selected');
  document.getElementById('track-biz').classList.remove('selected');
  document.getElementById('track-' + track).classList.add('selected');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 3000);
}

// ── CLOSE ON OUTSIDE CLICK ──
document.addEventListener('click', function(e) {
  if (e.target === document.getElementById('site-modal')) closeSiteModal();
  if (e.target === document.getElementById('leave-modal')) closeLeaveModal();
  if (e.target === document.getElementById('poe-modal')) closePOE();
});

// ── ESCAPE KEY ──
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closePOE(); closeSiteModal(); closeLeaveModal(); }
});
