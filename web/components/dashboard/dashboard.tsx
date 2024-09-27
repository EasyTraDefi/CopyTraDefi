// components/dashboard/dashboard.tsx

'use client';

import { useState, useEffect } from 'react';
import TradeCard from '../trade-card/trade-card';
import { TradeData } from '~/types/trade-data';
import { TransactionHistory } from '../transaction-history/transaction-history';
import { TransactionData } from '~/types/transaction-data';
import { fetchTrades, fetchTransactions } from '../../utils/apiCalls';
import { RealTimeTradesComponent } from './RealTimeTradesComponent';
import { SwapComponent } from './swapComponent';
// 


interface DashboardProps { }

export function Dashboard({ }: DashboardProps) {
    const [trades, setTrades] = useState<TradeData[]>([]);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [fetchedTrades, fetchedTransactions] = await Promise.all([
                    fetchTrades(),
                    fetchTransactions()
                ]);
                setTrades(fetchedTrades);
                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }



        fetchData();
    }, []);



    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Copy Trade Dashboard</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <p className="text-xl font-medium mb-4 md:mb-0">Welcome to your Copy Trade Dashboard!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Refresh Data
                </button>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Top Trades</h2>
                    {trades.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trades.map((trade: TradeData) => (
                                <TradeCard key={trade.id} trade={trade} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">No trades available.</div>
                    )}
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
                    {transactions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <TransactionHistory transactions={transactions} />
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">No transactions found.</div>
                    )}
                </div>
            </section>

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <RealTimeTradesComponent />
            </div>


            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">swap test</h1>
                <SwapComponent />
            </div>

        </div>
    );
}