
import { TradeData } from '~/types/trade-data';
import { TransactionData } from '~/types/transaction-data';



export const fetchTrades = async (): Promise<TradeData[]> => {
    const response = await fetch('/api/trades');
    return await response.json();
};

export const fetchTransactions = async (): Promise<TransactionData[]> => {
    const response = await fetch('/api/transactions');
    return await response.json();
};