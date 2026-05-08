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
function submitRSVP() {
    const name  = document.getElementById('f-name').value.trim();
    if (!name) { alert('Please enter your name.'); return; }

    const attendVal  = attending === 'yes' ? 'Yes, I\'ll be there' : 'Sorry, can\'t make it';
    const plus1Val   = plus1     === 'yes' ? 'Yes' : 'No';
    let plus1Name = '';
    
    if (plus1 === 'yes') {
        plus1Name = document.getElementById('f-plus1') ? document.getElementById('f-plus1').value.trim() : '';
        if (!plus1Name) {
            alert('Please enter your +1\'s name.');
            return;
        }
    } else {
        plus1Name = 'N/A';
    }

    // Create an iframe for submission
    const iframeId = 'hidden-rsvp-iframe';
    let iframe = document.getElementById(iframeId);
    
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    // Create form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_ACTION;
    form.target = iframeId;
    form.style.display = 'none';

    // Add form fields
    const fields = {
        'entry.559352220': name,
        'entry.877086558': attendVal,
        'entry.924523986': plus1Val,
        'entry.307527039': plus1Name
    };

    for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    }

    document.body.appendChild(form);
    
    // Submit and clean up
    form.submit();
    
    setTimeout(() => {
        document.body.removeChild(form);
    }, 100);

    // Show success message
    document.getElementById('rsvp-form').style.display = 'none';
    const msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    document.getElementById('success-name').textContent = name.split(' ')[0];
}