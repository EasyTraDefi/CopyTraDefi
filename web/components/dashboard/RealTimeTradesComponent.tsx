// File: web/components/dashboard/RealTimeTradesComponent.tsx

'use client';

import React, { useEffect, useState } from 'react';

interface TradeData {
    Solana: {
        DEXTrades: Array<{
            Trade: {
                Dex: {
                    ProgramAddress: string;
                    ProtocolFamily: string;
                    ProtocolName: string;
                };
                Buy: {
                    Account: {
                        Address: string;
                    };
                    Amount: number;
                    Currency: {
                        MintAddress: string;
                        Decimals: number;
                        Symbol: string;
                        Name: string;
                    };
                    PriceAgaistSellCurrency: number;
                };
                Sell: {
                    Account: {
                        Address: string;
                    };
                    Amount: number;
                    Currency: {
                        MintAddress: string;
                        Decimals: number;
                        Symbol: string;
                        Name: string;
                    };
                    PriceAgaistBuyCurrency: number;
                };
            };
            Block: {
                Time: string;
                Height: number;
            };
            Transaction: {
                Signature: string;
                FeePayer: string;
                Signer: string;
            };
        }>;
    };
}

export function RealTimeTradesComponent() {
    const [trades, setTrades] = useState<TradeData[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000/api/realTimeTrades');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTrades(prevTrades => [...prevTrades, ...data]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Real-time Trades on Raydium DEX (Solana)</h2>

            {trades.length > 0 ? (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full min-w-[800px] text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Time</th>
                                <th scope="col" className="py-3 px-6">Block Height</th>
                                <th scope="col" className="py-3 px-6">Transaction</th>
                                <th scope="col" className="py-3 px-6">Buy Currency</th>
                                <th scope="col" className="py-3 px-6">Sell Currency</th>
                                <th scope="col" className="py-3 px-6">Amount</th>
                                <th scope="col" className="py-3 px-6">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.map((trade, index) => (
                                <tr key={index}>
                                    <td>{trade.Solana.DEXTrades[0]?.Block?.Time}</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Block?.Height}</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Transaction?.Signature}</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Trade?.Buy?.Currency?.Symbol} ({trade.Solana.DEXTrades[0]?.Trade?.Buy?.Currency?.Name})</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Trade?.Sell?.Currency?.Symbol} ({trade.Solana.DEXTrades[0]?.Trade?.Sell?.Currency?.Name})</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Trade?.Buy?.Amount.toLocaleString()}</td>
                                    <td>{trade.Solana.DEXTrades[0]?.Trade?.Buy?.PriceAgaistSellCurrency.toFixed(6)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}