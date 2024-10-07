import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();

// Remove unused imports
// import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';

// Remove unused imports
// import fetch from 'cross-fetch';
import fetch from 'node-fetch';

import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

dotenv.config()

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection('https://api.devnet.solana.com');

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || '')));
// Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
const quoteResponse = await (
  await fetch('https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v\
&amount=100000000\
&slippageBps=50'
  )
).json();

// Usage
try {
  const quote = await getSwapQuote(
    'So11111111111111111111111111111111111111112', // SOL mint on Devnet
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC mint on Devnet
    100000000, // 0.1 SOL
    50 // 0.5% slippage
  );
  console.log('Swap Quote:', quote);
} catch (error) {
  console.error('Error getting swap quote:', error);
}

const { swapTransaction } = await (
  await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quoteResponse,
      userPublicKey: wallet.publicKey.toString(),
      wrapAndUnwrapSol: true,
      // feeAccount: "fee_account_public_key"
    })
  })
).json();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// deserialize the transaction
const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
console.log(transaction);

// sign the transaction
transaction.sign([wallet.payer]);


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Function to get the latest blockhash
async function getLatestBlockhash() {
  let latestBlockhash;
  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      latestBlockhash = await connection.getLatestBlockhash();
      console.log('Successfully fetched latest blockhash');
      break;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error.message}`);
      if (i === maxRetries - 1) {
        throw new Error('Failed to fetch latest blockhash after multiple attempts');
      }
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
    }
  }
  return latestBlockhash;
}

// get the latest block hash
const latestBlockHash = await getLatestBlockhash();

// Execute the transaction
const rawTransaction = transaction.serialize()

export const swap = async () => {
  try {
    console.log("start swapping...");
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2
    });
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid
    });
    console.log(`https://solscan.io/tx/${txid}`);
  } catch (error) {
    console.error('Error  swapping:', error);
  }
};