'use client'

import { useState } from 'react';


interface Transaction {
    id: number;
    amount: number;
    address: string;
    timestamp: string;
    type: 'Deposit' | 'Withdrawal';
}



const DepositForm = () => {
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [balance, setBalance] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate deposit process
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

            const newBalance = balance + parseFloat(amount);
            setBalance(newBalance);

            const newTransaction = {
                id: Date.now(),
                amount: parseFloat(amount),
                address: address,
                timestamp: new Date().toLocaleString(),
                type: 'Deposit'
            };

            setTransactionHistory(prev => [...prev, newTransaction]);

            alert('Deposit successful!');
            setAmount('');
            setAddress('');
        } catch (error) {
            console.error('Deposit failed:', error);
            alert('Deposit failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWithdraw = async () => {
        // Simulate withdrawal process
        await new Promise(resolve => setTimeout(resolve, 2000));

        const withdrawAmount = parseFloat(amount);
        if (withdrawAmount > balance) {
            alert('Insufficient funds');
            return;
        }

        const newBalance = balance - withdrawAmount;
        setBalance(newBalance);

        const newTransaction = {
            id: Date.now(),
            amount: withdrawAmount,
            address: address,
            timestamp: new Date().toLocaleString(),
            type: 'Withdrawal'
        };
        setTransactionHistory(prev => [...prev, newTransaction]);
        alert('Withdrawal successful!');
        setAmount('');
        setAddress('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-purple-400 to-indigo-600 h-64"></div>
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                        Wallet Management
                    </h2>

                    <div className="mb-6">
                        Current Balance: ${balance.toFixed(2)}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="pl-10 pr-3 pt-2 pb-2 text-base placeholder-gray-400 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Wallet Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter wallet address"
                                    className="pl-10 pr-3 pt-2 pb-2 text-base placeholder-gray-400 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50' : ''
                                }`}
                        >
                            {isSubmitting ? 'Processing...' : 'Deposit'}
                        </button>
                    </form>

                    <button
                        onClick={handleWithdraw}
                        disabled={isSubmitting || balance <= 0}
                        className={`mt-4 w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out ${isSubmitting || balance <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Withdraw
                    </button>

                    <h3 className="text-xl font-semibold mt-8">Transaction History</h3>
                    <ul>
                        {transactionHistory.map((tx, index) => (
                            <li key={index} className={`py-2 ${tx.type === 'Deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {tx.type}: ${tx.amount.toFixed(2)} to/from {tx.address} at {tx.timestamp}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DepositForm;