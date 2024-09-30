import { NextApiRequest, NextApiResponse } from 'next';
import { Helius } from 'helius-sdk';
import { TransactionData } from '../types/transaction-data';


const HELIUS_API_KEY = process.env.HELIUS_API as string;

const heliusClient = new Helius(HELIUS_API_KEY);

// interface TransactionData {
//   id: string;
//   signature: string;
//   memeCoinName: string;
//   amount: number;
//   type: 'buy' | 'sell';
//   timestamp: number;
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await heliusClient.rpc.getAssetsByOwner({
                ownerAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
                page: 1,
            });

            const transactions: TransactionData[] = response.items.map((tx: any): TransactionData => ({
                id: tx.id,
                signature: tx.signature,
                memeCoinName: tx.mintSymbol,
                amount: tx.amount,
                type: tx.type === 'buy' ? 'buy' : 'sell',
                timestamp: tx.timestamp,
            }));

            res.status(200).json(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}