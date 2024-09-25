// file: ~/TraDefi/web/components/transaction-history/transaction-history.tsx

'use client';

import { TransactionData } from '~/types/transaction-data';

interface TransactionHistoryProps {
    transactions: TransactionData[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Meme Coin</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Explorer Link</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td>{new Date(tx.timestamp).toLocaleString()}</td>
                            <td>{tx.memeCoinName}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.type}</td>
                            <td>
                                <a href={`https://solscan.io/tx/${tx.signature}`} target="_blank" rel="noopener noreferrer">
                                    View on Solscan
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}