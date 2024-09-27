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
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200">
            {/* Hero Section */}
            <header className="relative z-10 mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Welcome to Your Copy Trade Dashboard
                        </h1>
                        <p className="mt-4 max-w-2xl text-xl text-white-300">
                            Track your trades and manage your portfolio efficiently.
                        </p>
                        <div className="mt-6">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Sections */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Trades</h2>
                        {trades.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                                {trades.map((trade: TradeData) => (
                                    <TradeCard key={trade.id} trade={trade} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 animate-pulse">Loading...</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transaction History</h2>
                        {transactions.length > 0 ? (
                            <div className="overflow-x-auto">
                                <TransactionHistory transactions={transactions} />
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 animate-pulse">Loading...</div>
                        )}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Real-Time Trades</h2>
                        <RealTimeTradesComponent />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Swap Test</h2>
                        <SwapComponent />
                    </div>
                </section>
            </main>
        </div>
    );
}