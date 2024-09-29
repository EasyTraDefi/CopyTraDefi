'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface TransferData {
    currency: {
        name: string;
        address: string;
        tokenId: string;
        symbol: string;
    };
    amount: number;
    instruction: {
        callPath: string;
    };
}

export function SwapComponent() {
    const { data: transfers, isLoading, error } = useQuery<TransferData[], Error>({
        queryKey: ['token-transfers'],
        queryFn: async () => {
            try {
                const txSign = "5Sb1bCGQw68pLKqQEXciRvNcvcFaotBryCxm2kmJ34oC5VRP4eS1h661JoffGwG7FuGwSXUS4RMmj9CygRx9VMsb";
                const variables = JSON.stringify({ txSign });

                const response = await axios.post('https://graphql.bitquery.io', JSON.stringify({
                    query: `
            query FetchTokenTransfers($txSign: String!) {
              solana(network: solana) {
                transfers(signature: {is: $txSign}) {
                  currency {
                    name
                    address
                    tokenId
                    symbol
                  }
                  amount(transferType: {is: transfer}, currency: {not: "SOL"})
                  instruction {
                    callPath
                  }
                }
              }
            }
          `,
                    variables,
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': process.env.BITQUERY_API_URL,
                        'Authorization': process.env.BITQUERY_AUTH_TOKEN
                    }
                });

                console.log('API Response:', response.data);

                if (response.data && response.data.data && response.data.data.solana.transfers) {
                    return response.data.data.solana.transfers;
                } else {
                    throw new Error(`Invalid response from API: ${JSON.stringify(response.data)}`);
                }
            } catch (error) {
                console.error('Error fetching token transfers:', error);
                throw error;
            }
        },
        refetchInterval: 5000, // Refetch every 5 seconds
    });

    useEffect(() => {
        if (error) {
            console.error('Error fetching token transfers:', error);
        }
    }, [error]);

    if (isLoading) return <div>Loading...</div>;
    if (!transfers?.length) return <div>No transfers available</div>;

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full min-w-[800px] text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Currency Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Currency Symbol
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Amount
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Instruction Call Path
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transfers && Array.isArray(transfers) ? (
                        transfers.map((transfer, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {transfer.currency?.name || '-'}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {transfer.currency?.symbol || '-'}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {Number.isFinite(transfer.amount) ? transfer.amount.toLocaleString() : '-'}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap truncate">
                                    {transfer.instruction?.callPath || '-'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-4 px-6 font-medium text-gray-500">No transfers available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}
