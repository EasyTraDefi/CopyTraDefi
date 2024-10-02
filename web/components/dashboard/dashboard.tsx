'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardProps { }

export function Dashboard({ }: DashboardProps) {
    const [traderAddress, setTraderAddress] = useState('');
    const [fundsDeposited, setFundsDeposited] = useState(false);
    const [copiedTrade, setCopiedTrade] = useState(null);
    const [balance, setBalance] = useState('$1000');
    const [copyAmount, setCopyAmount] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch user data or initialize state as needed
    }, []);

    const handleDepositFunds = async () => {
        // Implement fund deposit logic here
        // For now, we'll just set the state
        setFundsDeposited(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement trade copying logic here
        // For now, we'll just log the action
        console.log('Copying trade for trader:', traderAddress);
        setCopiedTrade({
            id: '12345',
            amount: copyAmount,
            symbol: 'BTC'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200 flex items-center justify-center">
            <div className="max-w-4xl w-full p-32 bg-gray-600 rounded-lg shadow-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-11 items-center px-4">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl font-bold text-center text-gray-300 mb-6">
                            Welcome to Your Copy Trade Dashboard
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="traderAddress" className="block text-sm font-medium text-gray-300">
                                    Enter Trader's Address
                                </label>
                                <input
                                    type="text"
                                    id="traderAddress"
                                    value={traderAddress}
                                    onChange={(e) => setTraderAddress(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="copyAmount" className="block text-sm font-medium text-gray-300">
                                    Enter Amount to Copy
                                </label>
                                <input
                                    type="number"
                                    id="copyAmount"
                                    value={copyAmount}
                                    onChange={(e) => setCopyAmount(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="lg:w-1/2 space-y-3">
                        {fundsDeposited ? (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Your Account is Ready</h2>
                                <p className="mb-4">Your funds have been deposited successfully.</p>
                                <button
                                    onClick={() => router.push('/trade')}
                                    className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                >
                                    Start Trading
                                </button>
                            </>
                        ) : null}

                        {copiedTrade && (
                            <section className="bg-white rounded-lg shadow-md p-8 mb-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trade Copied Successfully</h2>
                                <p className="mb-4">The trade has been copied from the trader's address.</p>
                                <ul className="list-disc list-inside space-y-2 mb-4">
                                    <li>Amount: {copiedTrade.amount}</li>
                                    <li>Symbol: BTC</li>
                                </ul>
                                <p className="mb-4">Current balance: {balance}</p>
                                <button
                                    onClick={() => router.push('/clusters')}
                                    className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                                >
                                    View Portfolio
                                </button>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}