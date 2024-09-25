import { NextApiRequest, NextApiResponse } from 'next';
import { Helius } from 'helius-sdk';
import { TradeData } from '~/types/trade-data';


const HELIUS_API_KEY = process.env.HELIUS_API as string;

const heliusClient = new Helius(HELIUS_API_KEY);

// interface TradeData {
//   id: string;
//   memeCoinName: string;
//   price: number;
//   volume: number;
//   traderAddress: string;
//   timestamp: number;
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await heliusClient.rpc.getAssetsByOwner({
                ownerAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                page: 1,
            });

            const trades: TradeData[] = response.items.map((trade: any): TradeData => ({
                id: trade.id,
                memeCoinName: trade.mintSymbol,
                price: trade.price,
                volume: trade.volume,
                traderAddress: trade.traderAddress,
                timestamp: trade.timestamp,
            }));

            res.status(200).json(trades);
        } catch (error) {
            console.error('Error fetching trades:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}