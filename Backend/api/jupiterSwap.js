// Backend/api/jupiterSwap.js

import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import {fetch} from 'cross-fetch';
import { Wallet } from '@project-serum/anchor';
import pkg from 'bs58';
const {bs58} = pkg;

// It's recommended to use your own RPC endpoint
const connection = new Connection('https://api.mainnet-beta.solana.com');

// For testing purposes only. In production, use a secure method to manage private keys.
const wallet = new Wallet(Keypair.fromSecretKey(pkg.decode(process.env.PRIVATE_KEY || '')));

async function getSwapQuote(inputMint, outputMint, amount, slippageBps) {
    const response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`);
    return await response.json();
}

async function executeSwap(quoteResponse, userPublicKey) {
    const response = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.publicKey.toString(),
            wrapAndUnwrapSol: true,
        })
    });
    return await response.json();
}

export const processSwap = async (inputMint, outputMint, amount, slippageBps, userPublicKey) => {
    try {
        const quoteResponse = await getSwapQuote(inputMint, outputMint, amount, slippageBps);
        console.log('Quote Response:', quoteResponse);

        const swapResult = await executeSwap(quoteResponse, userPublicKey);
        console.log('Swap Result:', swapResult);

        const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

        // Sign the transaction
        transaction.sign([wallet.payer]);

        // Get the latest block hash
        const latestBlockHash = await connection.getLatestBlockhash();

        // Execute the transaction
        const rawTransaction = transaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2
        });

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid
        });

        console.log(`Transaction sent: https://solscan.io/tx/${txid}`);

        return txid;
    } catch (error) {
        console.error('Error processing swap:', error);
        throw error;
    }
}

// module.exports = { processSwap };