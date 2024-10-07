
import express from 'express';
import { config } from 'dotenv';
import { listnerHandler } from './api/listner.js';
import { swap } from './api/swap.js';
// import { createUserWallet, depositSOL, withdrawSOL, transferSOL } from './utils/walletManager';
config();

const app = express();
const port = 3008;
app.use(express.json());





// const Listner = require('./api/listner');
app.post('/webhookListner', listnerHandler);


swap();




// app.post('/deposit', async (req, res) => {
//   const { publicKey, amount } = req.body;
//   try {
//     await depositSOL(publicKey, amount);
//     res.status(200).send('Deposit successful');
//   } catch (error) {
//     res.status(500).send('Error during deposit');
//   }
// });

// app.post('/withdraw', async (req, res) => {
//   const { publicKey, amount } = req.body;
//   try {
//     await withdrawSOL(publicKey, amount);
//     res.status(200).send('Withdrawal successful');
//   } catch (error) {
//     res.status(500).send('Error during withdrawal');
//   }
// });

// app.post('/transfer', async (req, res) => {
//   const { fromPublicKey, toPublicKey, amount } = req.body;
//   try {
//     await transferSOL(fromPublicKey, toPublicKey, amount);
//     res.status(200).send('Transfer successful');
//   } catch (error) {
//     res.status(500).send('Error during transfer');
//   }
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
