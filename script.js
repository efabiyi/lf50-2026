// Countdown
  const eventDate = new Date('2026-07-25T18:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-mins').textContent = '0';
      document.getElementById('cd-secs').textContent = '0';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Attend toggle
  let attending = 'yes';
  function selectAttend(val) {
    attending = val;
    document.getElementById('btn-yes').classList.toggle('selected', val === 'yes');
    document.getElementById('btn-no').classList.toggle('selected', val === 'no');
  }

  // Plus1 toggle
  let plus1 = 'no';
  function selectPlus1(val) {
    plus1 = val;
    document.getElementById('btn-plus1-yes').classList.toggle('selected', val === 'yes');
    document.getElementById('btn-plus1-no').classList.toggle('selected',  val === 'no');
    document.getElementById('plus1-name-group').style.display = val === 'yes' ? 'block' : 'none';
  }

  // Submit to Google Form
  const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSe9WDtRbws7646cQAjp1BguHLtTZmlbcVAaX8gPxbLtZYJq5w/formResponse';

  async function submitRSVP() {
    const name  = document.getElementById('f-name').value.trim();
    if (!name) { alert('Please enter your name.'); return; }

    const attendVal  = attending === 'yes' ? 'Yes, I\'ll be there' : 'Sorry, can\'t make it';
    const plus1Val   = plus1     === 'yes' ? 'Yes' : 'No';
    const plus1Name  = document.getElementById('f-plus1') ? document.getElementById('f-plus1').value.trim() : '';

    const body = new URLSearchParams({
      'entry.559352220': name,
      'entry.307527039': attendVal,
      'entry.877086558_sentinel': plus1Val,
      'entry.924523986_sentinel': plus1Name,
    });

    try {
      await fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
    } catch(e) { /* no-cors always throws, response is opaque — that's fine */ }

    document.getElementById('rsvp-form').style.display = 'none';
    const msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    document.getElementById('success-name').textContent = name.split(' ')[0];
  }