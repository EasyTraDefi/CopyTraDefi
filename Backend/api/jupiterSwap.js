import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { fetch } from 'cross-fetch';
import { Wallet } from '@project-serum/anchor';
import pkg from 'bs58';

const { bs58 } = pkg;

// It's recommended to use your own RPC endpoint
const connection = new Connection('https://api.devnet.solana.com');

// For testing purposes only. In production, use a secure method to manage private keys.
const wallet = new Wallet(Keypair.fromSecretKey(pkg.decode(process.env.PRIVATE_KEY || '')));

export async function processSwap(inputMint, outputMint, amount, slippageBps, userPublicKey) {
    try {
        console.log('Input parameters:', { inputMint, outputMint, amount, slippageBps, userPublicKey });

        const quoteResponse = await getSwapQuote(inputMint, outputMint, amount, slippageBps);
        console.log('Quote Response:', quoteResponse);

        if (!quoteResponse || !quoteResponse.swapTransaction) {
            throw new Error('Invalid swap result');
        }

        const swapResult = quoteResponse;
        console.log('Swap Result:', swapResult);

        if (!swapResult.swapTransaction) {
            throw new Error('Invalid swap result');
        }

        const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, 'base64');
        console.log('Buffer length:', swapTransactionBuf.length);

        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        console.log('Deserialized transaction:', transaction);

        // Sign the transaction
        if (!wallet.payer) {
            throw new Error('Wallet payer is undefined');
        }
        transaction.sign([wallet.payer]);

        // Get the latest block hash
        const latestBlockHash = await connection.getLatestBlockhash();
        console.log('Latest Block Hash:', latestBlockHash);

        // Execute the transaction
        const rawTransaction = transaction.serialize();
        console.log('Raw Transaction length:', rawTransaction.length);

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

// Helper functions
async function getSwapQuote(inputMint, outputMint, amount, slippageBps) {
    try {
        const response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`);
        const quoteResponse = await response.json();

        if (quoteResponse.error) {
            throw new Error(`Quote API error: ${quoteResponse.error}`);
        }

        return quoteResponse;
    } catch (error) {
        console.error('Error fetching swap quote:', error);
        throw error;
    }
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