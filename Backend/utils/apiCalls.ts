import axios from 'axios';
import { TradeData } from '../types/trade-data';
import { TransactionData } from '../types/transaction-data';
import { getAvailableBalance } from './fundManagement';
import { deductFunds } from './deductFunds';


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
  // Check if user has sufficient funds
  const availableBalance = await getAvailableBalance(trade.userId);
  if (availableBalance < trade.amount) {
    throw new Error('Insufficient funds');
  }

  // Deduct funds from user's account
  await deductFunds(trade.userId, trade.amount);

  // Execute the trade using stored funds
  const response = await axios.post('/api/execute-trade', trade);
  return response.data;
}

export async function getNewTokens(): Promise<any[]> {
  const response = await axios.get('/api/new-tokens');
  return response.data;
}


export async function depositFunds(amount: number): Promise<string> {
  const response = await axios.post('/api/deposit', { amount });
  return response.data;
}

export async function withdrawFunds(amount: number): Promise<string> {
  const response = await axios.post('/api/withdrawal', { amount });
  return response.data;
}





