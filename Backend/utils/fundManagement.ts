// utils/fundManagement.ts

import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');

async function getAvailableBalance(userId: string): Promise<number> {
    // Convert userId to PublicKey
    const publicKey = new PublicKey(userId);

    // Get the account info
    const accountInfo = await connection.getAccountInfo(publicKey);

    if (!accountInfo) {
        throw new Error('Account not found');
    }

    // Parse the account info
    const lamports = accountInfo.lamports;

    // Convert lamports to SOL
    const availableBalance = lamports / 1_000_000_000; // 1 SOL = 1,000,000,000 lamports

    return availableBalance;
}

export { getAvailableBalance };