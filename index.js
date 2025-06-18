const express = require('express');
const app = express();
const VERIFY_TOKEN = 'my_997666_token';

app.use(express.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive Webhook Events
app.post('/webhook', (req, res) => {
  console.log('Webhook event:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
