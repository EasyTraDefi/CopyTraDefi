import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
// import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { Connection, Keypair, PublicKey, Transaction, MessageV0, VersionedTransaction, SendTransactionError } from '@solana/web3.js';
// import fetch from 'cross-fetch';
import fetch from 'node-fetch';

import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

dotenv.config()

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection('https://api.devnet.solana.com');

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode("67kgurqNpEqk3zNhK86j11tc2jMwdBkLyoYaCFZn7BAV8fMfTa2Y7zo1bTeMb1HMaSDXGMFj65r1QogjDipXC4w1" || '')));
// Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
const quoteResponse = await (
  await fetch('https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v\
&amount=100000000\
&slippageBps=50'
  )
).json();
// console.log({ quoteResponse })
// get serialized transactions for the swap



async function getSwapQuote(inputMint, outputMint, amount, slippageBps) {
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Failed to get quote:', error);
    throw error;
  }
}

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
      // quoteResponse from /quote api
      quoteResponse,
      // user public key to be used for the swap
      userPublicKey: wallet.publicKey.toString(),
      // auto wrap and unwrap SOL. default is true
      wrapAndUnwrapSol: true,
      // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
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
  }
  catch (error) {
    console.error('Error  swapping:', error);
  }
};




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

// Function to send raw transaction with retries
async function sendRawTransactionWithRetry(serializedTransaction, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const txid = await connection.sendRawTransaction(serializedTransaction, {
        skipPreflight: true,
        maxRetries: 2
      });

      console.log(`Transaction sent: https://solscan.io/tx/${txid}`);

      // Confirm the transaction
      const confirmation = await connection.confirmTransaction(txid);
      console.log('Confirmation:', confirmation);

      return txid;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
}

// Function to create and send a transaction
async function createAndSendTransaction(quoteResponse) {
  const transaction = new Transaction();

  console.log('Number of compiled instructions:', quoteResponse.compiledInstructions.length);

  // Manually add instructions from the quote response
  for (let i = 0; i < quoteResponse.compiledInstructions.length; i++) {
    const instruction = quoteResponse.compiledInstructions[i];
    console.log(`Instruction ${i}:`);
    console.log(JSON.stringify(instruction, null, 2));

    // Check if the instruction references any address tables
    const addressTableReferences = instruction.keys.filter(key => key.isWritable && key.pubkey.equals(PublicKey.default));
    if (addressTableReferences.length > 0) {
      console.warn(`Instruction ${i} references address table(s):`);
      console.log(addressTableReferences.map(ref => ref.pubkey.toBase58()));
    }

    transaction.add(instruction);
  }

  // Sign the transaction
  const signedTransaction = await wallet.signTransaction(transaction);

  // Get the latest blockhash
  const latestBlockhash = await getLatestBlockhash();

  // Add the blockhash to the transaction
  signedTransaction.recentBlockhash = latestBlockhash.blockhash;

  // Serialize the transaction
  const serializedTransaction = signedTransaction.serialize();

  console.log('Serialized Transaction length:', serializedTransaction.length);

  try {
    return await sendRawTransactionWithRetry(serializedTransaction);
  } catch (error) {
    console.error('Error sending transaction after multiple retries:', error);
    if (error instanceof SendTransactionError) {
      console.error('SendTransactionError details:');
      console.error('Message:', error.message);
      console.error('Logs:', error.logs);
      console.error('Signature:', error.signature);

      // If it's a SendTransactionError, we can call getLogs() on it
      const logs = await error.getLogs();
      console.error('Detailed Logs:', logs);
    }

    throw error;
  }
}

router.post('/swap', async (req, res) => {
  try {
    // Example values (you should replace these with real values)
    const inputMint = 'So11111111111111111111111111111111111111112'; // SOL mint
    const outputMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC mint
    const amount = 100000000; // 0.1 SOL in lamports
    const slippageBps = 50;

    // Get the swap quote
    const quoteResponse = await getSwapQuote(inputMint, outputMint, amount, slippageBps);

    console.log('Swap Quote:', JSON.stringify(quoteResponse, null, 2));

    // Log the compiled instructions
    console.log('Number of compiled instructions:', quoteResponse.compiledInstructions.length);

    // Create and send the transaction based on the quote
    const txid = await createAndSendTransaction(quoteResponse);

    res.status(200).send(`Swap initiated successfully. Transaction ID: ${txid}`);
  } catch (error) {
    console.error('Error during swap:', error);
    res.status(500).send('Error initiating swap');
  }
});
export default router;
