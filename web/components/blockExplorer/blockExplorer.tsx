'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Block {
    hash: string;
    height: number;
    timestamp: number;
}

interface NetworkStats {
    total_blocks: number;
    average_block_time: number;
}

interface ApiResponse<T> {
    data: T;
}

const BlockExplorer = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [blockchainData, setBlockchainData] = useState<NetworkStats | {}>({});
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3MjY5OTk2MDc1NTIsImVtYWlsIjoic3Nob3Bpbm8yOEBnbWFpbC5jb20iLCJhY3Rpb24iOiJ0b2tlbi1hcGkiLCJhcGlWZXJzaW9uIjoidjEiLCJpYXQiOjE3MjY5OTk2MDd9.GIVTNb3pcBLCa_seRhtZlOOHCFCmfaaCUtCbnW2C_d4"; // Your SolScan API key

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<ApiResponse<Block[]>>(`https://api.solscan.io/v1/account`, {
                headers: { Authorization: `Bearer ${apiKey}` }
            });
            setBlocks(response.data.data);

            const networkStatsResponse = await axios.get<ApiResponse<NetworkStats>>(`https://api.solscan.io/v1/stats`, {
                headers: { Authorization: `Bearer ${apiKey}` }
            });
            setBlockchainData(networkStatsResponse.data.data);
        } catch (error) {
            console.error('Error fetching blockchain data:', error);
        }
    };

    const renderNetworkStats = () => {
        if (typeof blockchainData === 'object' && blockchainData !== null) {
            return (
                <>
                    <h3>Network Stats</h3>
                    {/* <p>Total Blocks: {blockchainData.total_blocks || 'Loading...'}</p>
                    <p>Average Block Time: {blockchainData.average_block_time || 'Loading...'}</p> */}
                </>
            );
        }
        return null;
    };

    return (
        <div className="block-explorer">
            <h2>Block Explorer</h2>
            {/* Render blocks list */}
            <ul>
                {blocks.map((block, index) => (
                    <li key={index}>
                        <span>{block.hash}</span>
                        <span>{block.height}</span>
                        <span>{new Date(block.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>

            {renderNetworkStats()}
        </div>
    );
};

export default BlockExplorer;
