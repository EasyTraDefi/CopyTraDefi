'use client'

import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js'
import { createUserWallet, depositSOL, withdrawSOL } from '../../Backend/utils/walletManager'

interface Transaction {
    id: string
    amount: number
    address: string
    timestamp: number
    type: 'Deposit' | 'Withdrawal'
}

const Wallet = () => {
    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [balance, setBalance] = useState(0)
    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([])
    const [userId, setUserId] = useState(Math.random().toString(36).substr(2, 9)) // Generate a random user ID

    const connection = new Connection('https://api.devnet.solana.com')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Create a new wallet for the user if it doesn't exist
            const userWallet = await createUserWallet(userId)

            // Deposit SOL
            const signature = await depositSOL(userWallet.publicKey, parseFloat(amount))

            // Update balance
            const newBalance = await connection.getBalance(userWallet.publicKey)
            setBalance(newBalance / LAMPORTS_PER_SOL)

            // Add transaction to history
            const newTransaction: Transaction = {
                id: signature,
                amount: parseFloat(amount),
                address: userWallet.publicKey.toBase58(),
                timestamp: Date.now(),
                type: 'Deposit'
            }
            setTransactionHistory(prev => [...prev, newTransaction])

            alert('Deposit successful!')
            setAmount('')
            setAddress('')
        } catch (error) {
            console.error('Deposit failed:', error);

            // Add a type guard to ensure 'error' is actually an Error object
            if (error instanceof Error) {
                const errorMessage = error.message || 'An unknown error occurred';
                alert(`Deposit failed: ${errorMessage}`);
            } else {
                alert('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleWithdraw = async () => {
        setIsSubmitting(true)

        try {
            // Get the user's wallet
            const userWallet = await createUserWallet(userId)

            // Check balance
            const currentBalance = await connection.getBalance(userWallet.publicKey)
            if (currentBalance / LAMPORTS_PER_SOL < parseFloat(amount)) {
                alert('Insufficient funds')
                return
            }

            // Withdraw SOL
            const signature = await withdrawSOL(userWallet.publicKey, parseFloat(amount))

            // Update balance
            const newBalance = await connection.getBalance(userWallet.publicKey)
            setBalance(newBalance / LAMPORTS_PER_SOL)

            // Add transaction to history
            const newTransaction: Transaction = {
                id: signature,
                amount: parseFloat(amount),
                address: userWallet.publicKey.toBase58(),
                timestamp: Date.now(),
                type: 'Withdrawal'
            }
            setTransactionHistory(prev => [...prev, newTransaction])

            alert('Withdrawal successful!')
            setAmount('')
            setAddress('')
        } catch (error) {
            console.error('Withdrawal failed:', error)
            alert('Withdrawal failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Solana Wallet Management
                </h2>

                <div className="mb-6">
                    Current Balance: {balance.toFixed(6)} SOL
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                Amount (SOL)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.000001"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full md:w-auto px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50' : ''}`}
                        >
                            {isSubmitting ? 'Processing...' : 'Deposit'}
                        </button>
                        <button
                            onClick={handleWithdraw}
                            disabled={isSubmitting || balance <= 0}
                            className={`w-full md:w-auto px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out ${isSubmitting || balance <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Withdraw
                        </button>
                    </div>
                </form>

                <h3 className="text-xl font-semibold mt-8">Transaction History</h3>
                <ul className="space-y-2">
                    {transactionHistory.map((tx, index) => (
                        <li key={index} className={`py-2 px-4 rounded-lg ${tx.type === 'Deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <div className="flex justify-between">
                                <span>{tx.type}</span>
                                <span>{tx.amount.toFixed(6)} SOL</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                to/from {tx.address.slice(0, 6)}...{tx.address.slice(-6)} at {new Date(tx.timestamp).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Wallet