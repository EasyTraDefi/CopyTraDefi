'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StreamResult {
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
}

export function DashboardStreamComponent() {
    const [data, setData] = useState<StreamResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://streaming.bitquery.io/eap', JSON.stringify({
                    query: "subscription {\n  Solana {\n    DEXTrades(\n      where: {Trade: {Dex: {ProgramAddress: {is \"675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8\"}}}}\n    ) {\n      Trade {\n        Dex {\n          ProgramAddress\n          ProtocolFamily\n          ProtocolName\n        }\n        Buy {\n          Account {\n            Address\n          }\n          Amount\n          Currency {\n            MintAddress\n            Decimals\n            Symbol\n            Name\n          }\n          PriceAgaistSellCurrency: Price\n        }\n        Sell {\n          Account {\n            Address\n          }\n          Amount\n          Currency {\n            MintAddress\n            Decimals\n            Symbol\n            Name\n          }\n          PriceAgaistBuyCurrency: Price\n        }\n      }\n      Block {\n        Time\n        Height\n      }\n      Transaction {\n        Signature\n        FeePayer\n        Signer\n      }\n    }\n  }",
                    variables: "{}"
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': 'BQYA9UfUMoFfml4aVGj3vtBRVJsPogg2',
                        'Authorization': 'Bearer ory_at_McYSvTCvHyl9sXqXWgBHyoVc42q7Mzi7fcdPCVQjPEs.71l4QffIS4Y7cMBnV1aNRbOVOJbDNsePSMCW58LqNxQ'
                    }
                });

                const result = response.data;
                setData(result);
            } catch (err) {
                console.error(err);
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h2>Latest Trade Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}