// File: pages/portfolio.tsx

'use client';

import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function PortfolioPage() {
    const { connection } = useConnection();
    const { publicKey, wallet } = useWallet();
    const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);

    useEffect(() => {
        if (publicKey) {
            setWalletAddress(publicKey);
        }
    }, [publicKey]);

    useEffect(() => {
        if (walletAddress) {
            console.log('Wallet Connected :)');
        }
    }, [walletAddress]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">Your Meme Coin Portfolio</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-500">Wallet Address:</span>
                            <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                                {walletAddress ? walletAddress.toBase58().slice(0, 4).toUpperCase() : 'NA'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-purple-400 to-indigo-600 text-white rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-2">Total Meme Coin Balance</h2>
                            <p className="text-4xl font-bold">10,000,000 SAMO</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-400 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-2">Copied Trades</h2>
                            <p className="text-4xl font-bold">5</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-lg p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-2">Profit/Loss</h2>
                            <p className="text-4xl font-bold text-green-600">+1000% 🚀</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Copied Traders</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-md">
                                <h3 className="text-xl font-semibold mb-2">Top Performing Traders</h3>
                                <div className="flex items-center justify-between">
                                    <span>Trader1</span>
                                    <span>+500% 🚀</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Trader2</span>
                                    <span>+300% 🚀</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Trader3</span>
                                    <span>+200% 🚀</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Recent Copied Trades</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>Copied 100,000 BONK</span>
                                        <span>$10,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Copied 50,000 SAMO</span>
                                        <span>$20,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Copied 200,000 ORCA</span>
                                        <span>$15,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}