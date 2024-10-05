
import express from 'express';
import { config } from 'dotenv';
import { listnerHandler } from './api/listner.js';
import { processSwap } from './api/jupiterSwap.js';
config();

const app = express();
const port = 3008;
app.use(express.json());



processSwap;


// const Listner = require('./api/listner');
app.post('/webhookListner', listnerHandler);





// Endpoint for processing swaps
app.post('/processSwap', async (req, res) => {
  try {
    const { inputMint, outputMint, amount, slippageBps, userPublicKey } = req.body;
    const txid = await processSwap(inputMint, outputMint, amount, slippageBps, userPublicKey);
    res.json({ txid });
  } catch (error) {
    console.error('Error processing swap:', error);
    res.status(500).json({ error: 'Failed to process swap' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
