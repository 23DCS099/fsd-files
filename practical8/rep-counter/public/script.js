async function fetchCounter() {
  const res = await fetch('/api/counter');
  const data = await res.json();
  document.getElementById('count').innerText = data.count;
}

async function updateCounter(action) {
  const res = await fetch('/api/counter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  const data = await res.json();
  document.getElementById('count').innerText = data.count;
}

window.onload = fetchCounter;
