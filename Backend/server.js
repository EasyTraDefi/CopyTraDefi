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

// deposit & withdraw

app.post('/api/deposit', async (req, res) => {
  const { amount } = req.body;

  // Validate input
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Store funds securely 
  const transactionId = generateUniqueId();
  await storeFunds(transactionId, amount);

  res.json({ message: 'Deposit successful', transactionId });
});

app.post('/api/withdrawal', async (req, res) => {
  const { amount } = req.body;

  // Validate input
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Check available balance
  const availableBalance = await getAvailableBalance(req.user.id);
  if (availableBalance < amount) {
    return res.status(402).json({ error: 'Insufficient funds' });
  }

  // Process withdrawal
  const transactionId = generateUniqueId();
  await processWithdrawal(transactionId, amount);

  res.json({ message: 'Withdrawal initiated', transactionId });
});