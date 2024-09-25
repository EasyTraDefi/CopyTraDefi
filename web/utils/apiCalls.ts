// utils/apiCalls.ts

import { Helius } from "helius-sdk";
import { TradeData } from '~/types/trade-data';
import { TransactionData } from '~/types/transaction-data';

const HELIUS_API_KEY = process.env.HELIUS_API as string;

const heliusClient = new Helius(HELIUS_API_KEY);

export const fetchTrades = async (): Promise<TradeData[]> => {
    const response = await fetch('/api/trades');
    return await response.json();
};

export const fetchTransactions = async (): Promise<TransactionData[]> => {
    const response = await fetch('/api/transactions');
    return await response.json();
};

export const executeTrade = async (trade: TradeData): Promise<string> => {
    try {
        // Implement the logic to execute the trade using Helius SDK
        // This is just a placeholder, you'll need to implement the actual execution logic
        console.log('Executing trade:', trade);

        // Simulating a successful transaction
        return '1234567890abcdef';
    } catch (error) {
        console.error('Error executing trade:', error);
        throw error;
    }
};