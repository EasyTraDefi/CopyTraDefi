// utils/fundManagement.ts

import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');

async function deductFunds(userId: string, amount: number): Promise<void> {
    // Convert userId to PublicKey
    const publicKey = new PublicKey(userId);

    // Calculate the amount in lamports
    const amountInLamports = Math.floor(amount * 1_000_000_000); // Convert SOL to lamports

    // Create a new instruction
    const instruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey, // Same account for demonstration purposes
        lamports: amountInLamports,
    });

    // Create a new transaction
    const transaction = new Transaction().add(instruction);

    // Send the transaction
    const signature = await connection.sendRawTransaction(transaction.serialize());

    // Wait for confirmation
    await connection.confirmTransaction(signature);

    console.log(`Deduction of ${amount} SOL confirmed`);
}

export { deductFunds };