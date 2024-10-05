
import express from 'express';
import { config } from 'dotenv';
import { listnerHandler } from './api/listner.js';
import { processSwap } from './api/jupiterSwap.js';
import { swap } from './api/swap.js';
config();

const app = express();
const port = 3008;
app.use(express.json());



processSwap;


// const Listner = require('./api/listner');
app.post('/webhookListner', listnerHandler);


swap() ;


// Endpoint for processing swaps
// app.post('https://quote-api.jup.ag/v6/swap', async (req, res) => {
//   try {
//     const { inputMint, outputMint, amount, slippageBps, userPublicKey } = req.body;
//     const txid = await processSwap(inputMint, outputMint, amount, slippageBps, userPublicKey);
//     console.log("start swapping..");
//     console.log(res.json({ txid }));
//   } catch (error) {
//     console.error('Error processing swap:', error);
//     res.status(500).json({ error: 'Failed to process swap' });
//   }
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
