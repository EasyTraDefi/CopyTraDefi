// // Backend/utils/walletManager.ts

// import dotenv from 'dotenv';
// import { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, SendTransactionError } from '@solana/web3.js';

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// console.log('Environment Variables:');
// console.log('USER_PUBLIC_KEY:', process.env.USER_PUBLIC_KEY);
// console.log('WALRUS_PRIVATE_KEY:', process.env.PRIVATE_KEY?.slice(0, 10) + '...');

// const connection = new Connection('https://api.devnet.solana.com');


// const initialDeposit = 1; // Adjust this value as needed

// interface Wallet {
//     publicKey: PublicKey;
//     balance: number;
//     availableTokens: number;
// }



// let wallet: Keypair | null = null;

// async function initWallet(userPublicKeyStr: string = process.env.USER_PUBLIC_KEY || '8H9G4yLQ4F7e9C4kM9bK8aT7rP5nQ3') {
//     try {
//         if (!userPublicKeyStr) {
//             throw new Error("User public key is not available");
//         }

//         const publicKey = new PublicKey(userPublicKeyStr);

//         const privateKeyString = process.env.PRIVATE_KEY || '';
//         if (!privateKeyString) {
//             throw new Error("WALRUS_PRIVATE_KEY environment variable not set");
//         }

//         const privateKeyArray = privateKeyString.split(',').map(Number);
//         wallet = Keypair.fromSecretKey(Buffer.from(privateKeyArray));

//         const balance = await connection.getBalance(publicKey);
//         console.log('Funding wallet balance:', balance / LAMPORTS_PER_SOL);

//         if (balance < LAMPORTS_PER_SOL) {
//             throw new Error('Funding wallet has insufficient balance');
//         }
//     } catch (error) {
//         console.error('Failed to initialize wallet:', error);
//         throw error;
//     }
// }




// // Ensure wallet is initialized before exporting
// initWallet().catch((error) => {
//     console.error('Failed to initialize wallet:', error);
//     // Handle the error appropriately (e.g., log it, send an alert, etc.)
// });


// async function createUserWallet(userId: string): Promise<Wallet> {
//     if (!wallet) {
//         throw new Error('Wallet not initialized');
//     }

//     const newWallet = Keypair.generate();
//     await fundWallet(newWallet.publicKey, initialDeposit);

//     return {
//         publicKey: newWallet.publicKey,
//         balance: await connection.getBalance(newWallet.publicKey),
//         availableTokens: await connection.getBalance(newWallet.publicKey)
//     };
// }

// async function fundWallet(publicKey: PublicKey, amount: number): Promise<void> {
//     if (!wallet) {
//         throw new Error('Wallet not initialized');
//     }

//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: wallet.publicKey,
//             toPubkey: publicKey,
//             lamports: amount * LAMPORTS_PER_SOL
//         })
//     );

//     try {
//         const signature = await connection.sendTransaction(transaction, wallet ? [wallet] : []);
//         console.log(`Successfully funded wallet ${publicKey.toBase58()} with ${amount} SOL`);
//     } catch (error) {
//         if (error instanceof SendTransactionError) {
//             console.error('Failed to fund wallet:', error.message);
//             console.error('Simulation logs:', error.logs);
//             throw new Error('Insufficient funds to fund wallet');
//         } else {
//             console.error('Unexpected error while funding wallet:', error);
//             throw error;
//         }
//     }
// }

// async function depositSOL(publicKey: PublicKey, amount: number): Promise<string> {
//     if (!wallet) {
//         throw new Error('Wallet not initialized');
//     }

//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: wallet.publicKey,
//             toPubkey: publicKey,
//             lamports: amount * LAMPORTS_PER_SOL
//         })
//     );

//     const signature = await connection.sendTransaction(transaction, wallet ? [wallet] : []);
//     return signature;
// }

// async function withdrawSOL(publicKey: PublicKey, amount: number): Promise<string> {
//     if (!wallet) {
//         throw new Error('Wallet not initialized');
//     }

//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: publicKey,
//             toPubkey: wallet.publicKey,
//             lamports: amount * LAMPORTS_PER_SOL
//         })
//     );

//     const signature = await connection.sendTransaction(transaction, wallet ? [wallet] : []);
//     return signature;
// }

// async function transferSOL(fromPublicKey: PublicKey, toPublicKey: PublicKey, amount: number): Promise<string> {
//     if (!wallet) {
//         throw new Error('Wallet not initialized');
//     }

//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: fromPublicKey,
//             toPubkey: toPublicKey,
//             lamports: amount * LAMPORTS_PER_SOL
//         })
//     );

//     const signature = await connection.sendTransaction(transaction, wallet ? [wallet] : []);
//     return signature;
// }




// function getUserWallet(userId: string): Wallet {
//     // Implement logic to retrieve the user's wallet based on the userId
//     // This could involve querying a database or storage system
//     return { publicKey: new PublicKey(''), balance: 0, availableTokens: 0 };
// }

// function generateUniqueId(): string {
//     return Math.random().toString(36).substr(2, 9);
// }

// function generateSignature(/* parameters */): string {
//     // Implement your signature generation logic here
//     return '';
// }

// interface TransactionData {
//     id: string;
//     signature: string;
//     memeCoinName: string;
//     amount: number;
//     type: 'buy' | 'sell';
//     timestamp: number;
//     sourceFundId?: string;
//     destinationFundId?: string;
//     userWallet: Wallet;
// }

// function createTransactionData(/* parameters */): TransactionData {
//     const userWallet = getUserWallet('565');
//     return {
//         id: generateUniqueId(),
//         signature: generateSignature(/* parameters */),
//         memeCoinName: "tutu",
//         amount: 5,
//         type: 'buy',
//         timestamp: 57678,
//         sourceFundId: '678',
//         destinationFundId: '89',
//         userWallet: userWallet
//     };
// }

// export { createUserWallet, depositSOL, withdrawSOL, transferSOL, createTransactionData };