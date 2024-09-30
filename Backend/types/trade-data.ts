// file: ~/TraDefi/web/types/trade-data.ts

export interface TradeData {
    id: string;
    userId: string;
    amount: number;
    memeCoinName: string;
    price: number;
    volume: number;
    traderAddress: string;
    timestamp: number;
}