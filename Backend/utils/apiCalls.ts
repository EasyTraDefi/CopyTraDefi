import axios from 'axios';
import { TradeData } from '../types/trade-data';
import { TransactionData } from '../types/transaction-data';
import { getAvailableBalance } from './fundManagement';
import { deductFunds } from './deductFunds';



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


export async function depositFunds(amount: number): Promise<string> {
  const response = await axios.post('/api/deposit', { amount });
  return response.data;
}

export async function withdrawFunds(amount: number): Promise<string> {
  const response = await axios.post('/api/withdrawal', { amount });
  return response.data;
}





