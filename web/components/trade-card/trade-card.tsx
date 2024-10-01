// components/trade-card/trade-card.tsx

'use client';

import { useState, useEffect } from 'react';
import { TradeData } from '~/types/trade-data';
import { executeTrade } from '../../../Backend/utils/apiCalls';

interface TradeCardProps {
    trade: TradeData;
}

export default function TradeCard({ trade }: TradeCardProps) {
    const [isCopying, setIsCopying] = useState(false);

    const handleCopyTrade = async () => {
        setIsCopying(true);
        try {
            if (
                !trade.memeCoinName ||
                typeof trade.price !== 'number' ||
                typeof trade.volume !== 'number' ||
                !trade.traderAddress
            ) {
                console.error('Incomplete trade data');
                return;
            }

            const result = await executeTrade(trade);
            console.log('Trade executed successfully:', result);
            // You might want to show a success message here
        } catch (error) {
            console.error('Error copying trade:', error);
            // You might want to show an error message here
        } finally {
            setIsCopying(false);
        }
    };

    return (
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title">{trade.memeCoinName ?? 'Unknown Coin'}</h2>
                <p>Price: ${trade.price?.toFixed(2) ?? 'N/A'}</p>
                <p>Volume: {trade.volume?.toFixed(2) ?? 'N/A'}</p>
                <p>Trader: {trade.traderAddress ? `${trade.traderAddress.slice(0, 6)}...${trade.traderAddress.slice(-4)}` : 'N/A'}</p>
                <button
                    onClick={handleCopyTrade}
                    className={`btn btn-primary ${isCopying ? 'loading' : ''}`}
                    disabled={!trade.memeCoinName || !trade.price || !trade.volume || !trade.traderAddress}
                >
                    {isCopying ? 'Copying...' : 'Copy Trade'}
                </button>
            </div>
        </div>
    );
}