// app.js (or wherever you define your routes)
import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = 3008;

app.post('/webhooks', async (req, res) => {
  try {
    const payload = req.body;
    console.log('Received webhook:', payload);
    // Process the webhook payload here
    // You might want to save it to a database, trigger some actions, etc.

    
    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});