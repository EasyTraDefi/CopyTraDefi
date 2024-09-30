import axios from 'axios';
import { TradeData } from '../types/trade-data';
import { TransactionData } from '../types/transaction-data';


// In apiCalls.ts
export const fetchTrades = async (): Promise<any[]> => {
  try {
    const response = await axios.post(
      'https://streaming.bitquery.io/eap',
      {
        query: `
            subscription {
              solana(network: solana) {
                dexTrades(
                  options: {limit: 100},
                  where: {
                    tradeAmount_gt: 0
                  },
                  orderBy: blockHeight_DESC
                ) {
                  transaction {
                    hash
                  }
                  block {
                    height
                    timestamp {
                      iso8601
                    }
                  }
                  baseCurrency {
                    symbol
                    tokenAddress
                  }
                  quoteCurrency {
                    symbol
                    tokenAddress
                  }
                  tradeAmount
                  quotePrice
                }
              }
            }
          `,
        variables: {}
      },
      {
        headers: {
          'X-API-KEY': 'BQYA9UfUMoFfml4aVGj3vtBRVJsPogg2',
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`API returned non-200 status: ${response.status}`);
    }

    return response.data.data.solana.dexTrades;
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
};

export async function fetchTransactions(): Promise<TransactionData[]> {
  const response = await axios.get('/api/transactions');
  return response.data;
}

export async function executeTrade(trade: TradeData): Promise<any> {
  const response = await axios.post('/api/execute-trade', trade);
  return response.data;
}

export async function getNewTokens(): Promise<any[]> {
  const response = await axios.get('/api/new-tokens');
  return response.data;
}

// // utils/apiCalls.ts

// import { Helius } from "helius-sdk";
// import { TradeData } from '~/types/trade-data';
// import { TransactionData } from '~/types/transaction-data';

// const HELIUS_API_KEY = process.env.HELIUS_API as string;

// const heliusClient = new Helius(HELIUS_API_KEY);

// export const fetchTrades = async (): Promise<TradeData[]> => {
//     const response = await fetch('/api/trades');
//     return await response.json();
// };

// export const fetchTransactions = async (): Promise<TransactionData[]> => {
//     const response = await fetch('/api/transactions');
//     return await response.json();
// };

// export const executeTrade = async (trade: TradeData): Promise<string> => {
//     try {
//         // Implement the logic to execute the trade using Helius SDK
//         // This is just a placeholder, you'll need to implement the actual execution logic
//         console.log('Executing trade:', trade);

//         // Simulating a successful transaction
//         return '1234567890abcdef';
//     } catch (error) {
//         console.error('Error executing trade:', error);
//         throw error;
//     }
// };