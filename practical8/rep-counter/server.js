const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const counterFile = path.join(__dirname, 'counter.json');

app.use(bodyParser.json());
app.use(express.static('public'));

let counter = 0;
if (fs.existsSync(counterFile)) {
  const data = fs.readFileSync(counterFile);
  counter = JSON.parse(data).count;
}


app.get('/api/counter', (req, res) => {
  res.json({ count: counter });
});

app.post('/api/counter', (req, res) => {
  const { action } = req.body;
  if (action === 'increment') counter++;
  else if (action === 'decrement' && counter > 0) counter--;
  else if (action === 'reset') counter = 0;

  fs.writeFileSync(counterFile, JSON.stringify({ count: counter }));
  res.json({ count: counter });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
