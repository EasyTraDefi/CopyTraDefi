// export interface Wallet {
//     publicKey: PublicKey;
//     balance: number;
//     availableTokens: number;
// }


const initialDeposit = 10; // Adjust this value as needed


export interface TransactionData {
    id: string;
    signature: string;
    memeCoinName: string;
    amount: number;
    type: 'buy' | 'sell';
    timestamp: number;
    sourceFundId?: string; // New field to store the fund ID from which the funds were taken
    destinationFundId?: string; // New field to store the fund ID to which the funds were added back
}