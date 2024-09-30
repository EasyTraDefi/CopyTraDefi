// pages/api/execute-trade.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { executeTrade } from '../utils/apiCalls';
import { deductFunds } from '../utils/deductFunds';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, symbol, amount } = req.body;

        if (!userId || !symbol || !amount) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Convert userId to PublicKey
        const publicKey = new PublicKey(userId);

        // Validate amount
        const amountNumber = Number(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Fetch current price for the symbol
        const currentPrice = await fetchCurrentPrice(symbol);

        // Calculate trade amount in SOL
        const solAmount = amountNumber * currentPrice;

        // Check if user has sufficient balance
        const userBalance = await connection.getBalance(publicKey);
        if (userBalance < solAmount * 1_000_000_000) {
            return res.status(402).json({ error: 'Insufficient funds' });
        }

        // Deduct funds from user's account
        await deductFunds(userId, solAmount);

        // Execute the trade
        const transactionSignature = await executeTrade(symbol, amountNumber, publicKey);

        res.status(200).json({ message: 'Trade executed successfully', signature: transactionSignature });
    } catch (error) {
        console.error('Error executing trade:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fetchCurrentPrice(symbol: string): Promise<number> {
    // Implement price fetching logic here
    // For demonstration purposes, we'll just return a random price
    return Math.random() * 100 + 50; // Random price between 50 and 150
}

async function deductFunds(userId: string, amount: number): Promise<void> {
    // Implement fund deduction logic here
    // For demonstration purposes, we'll just log the deduction
    console.log(`Deducting ${amount} SOL from user ${userId}`);
}

async function executeTrade(symbol: string, amount: number, publicKey: PublicKey): Promise<string> {
    // Implement trade execution logic here
    // For demonstration purposes, we'll simulate a transaction
    const signature = await connection.requestAirdrop(publicKey, Math.floor(amount * 1_000_000_000));
    console.log(`Executing trade for ${symbol} x${amount}`);
    return signature;
}