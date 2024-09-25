// file: ~/TraDefi/web/types/transaction-data.ts

export interface TransactionData {
    id: string;
    signature: string;
    memeCoinName: string;
    amount: number;
    type: 'buy' | 'sell';
    timestamp: number;
}