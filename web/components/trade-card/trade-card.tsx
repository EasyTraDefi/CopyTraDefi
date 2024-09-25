// file: ~/TraDefi/web/components/trade-card/trade-card.tsx

'use client';

import { useTransactionToast } from '../ui/ui-layout';
// import { executeTrade } from '../../utils/apiCalls';
import { TradeData } from '../../types/trade-data';

interface TradeCardProps {
    trade: Partial<TradeData>;
}

export function TradeCard({ trade }: TradeCardProps) {
    const transactionToast = useTransactionToast();

    const handleCopyTrade = async () => {
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

            const result = await executeTrade(trade as TradeData);
            transactionToast(result.signature);
        } catch (error) {
            console.error('Error copying trade:', error);
        }
    };

    return (
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title">{trade.memeCoinName ?? 'Unknown Coin'}</h2>
                <p>Price: ${trade.price?.toFixed(2) ?? 'N/A'}</p>
                <p>Volume: {trade.volume?.toFixed(2) ?? 'N/A'}</p>
                <p>Trader: {trade.traderAddress ? `${trade.traderAddress.slice(0, 6)}...${trade.traderAddress.slice(-4)}` : 'N/A'}</p>
                <button onClick={handleCopyTrade} className="btn btn-primary" disabled={!trade.memeCoinName || !trade.price || !trade.volume || !trade.traderAddress}>
                    Copy Trade
                </button>
            </div>
        </div>
    );
}