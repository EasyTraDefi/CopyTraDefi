'use client'

import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'

interface Transaction {
    id: number
    amount: number
    address: string
    timestamp: string
    type: 'Deposit' | 'Withdrawal'
}

const DepositForm = () => {
    const [amount, setAmount] = useState('')
    const [address, setAddress] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [balance, setBalance] = useState(0)
    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Simulate deposit process
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newBalance = balance + parseFloat(amount)
            setBalance(newBalance)

            const newTransaction = {
                id: Date.now(),
                amount: parseFloat(amount),
                address: address,
                timestamp: new Date().toLocaleString(),
                type: 'Deposit'
            }

            setTransactionHistory(prev => [...prev, newTransaction])

            alert('Deposit successful!')
            setAmount('')
            setAddress('')
        } catch (error) {
            console.error('Deposit failed:', error)
            alert('Deposit failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleWithdraw = async () => {
        // Simulate withdrawal process
        await new Promise(resolve => setTimeout(resolve, 2000))

        const withdrawAmount = parseFloat(amount)
        if (withdrawAmount > balance) {
            alert('Insufficient funds')
            return
        }

        const newBalance = balance - withdrawAmount
        setBalance(newBalance)

        const newTransaction = {
            id: Date.now(),
            amount: withdrawAmount,
            address: address,
            timestamp: new Date().toLocaleString(),
            type: 'Withdrawal'
        }
        setTransactionHistory(prev => [...prev, newTransaction])
        alert('Withdrawal successful!')
        setAmount('')
        setAddress('')
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Wallet Management
                </h2>

                <div className="mb-6">
                    Current Balance: ${balance.toFixed(2)}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Wallet Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter wallet address"
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
                                <span>${tx.amount.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                to/from {tx.address} at {tx.timestamp}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DepositForm