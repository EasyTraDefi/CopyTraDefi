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
        <div className="container mx-3 px-4 py-8 min-h-screen bg-gradient-to-b from-skyblue-200 via-cyan-100 to-lightblue-200">
            <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-xl overflow-hidden">


                <div className="flex flex-col items-center mb-8">

                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                        Your Portfolio
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Here you can view and manage your investments.
                    </p>
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center text-gray-400 font-bold text-2xl mb-2">
                        {walletAddress ? walletAddress.toBase58().slice(0, 4).toUpperCase() : 'NA'}
                    </div>
                    <p className="text-sm text-gray-600">{walletAddress ? walletAddress.toBase58() : 'Not connected'}</p>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
                        <p className="text-2xl font-bold">$1,000</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Open Positions</h2>
                        <p className="text-2xl font-bold">5</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Profit/Loss</h2>
                        <p className="text-2xl font-bold text-green-600">+$500</p>
                    </div>
                </div>
            </div>
        </div>
    );
}