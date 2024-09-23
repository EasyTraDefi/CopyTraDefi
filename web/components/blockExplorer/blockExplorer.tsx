// src/components/BlockExplorer/BlockExplorer.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlockExplorer = () => {
    const [blocks, setBlocks] = useState([]);
    const [blockchainData, setBlockchainData] = useState({});

    useEffect(() => {
        // Fetch initial blockchain data
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.example.com/blocks');
            setBlocks(response.data);

            // Fetch additional blockchain data (e.g., network stats)
            const networkStatsResponse = await axios.get('https://api.example.com/network-stats');
            setBlockchainData(networkStatsResponse.data);
        } catch (error) {
            console.error('Error fetching blockchain data:', error);
        }
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

            {/* Render additional blockchain data */}
            <h3>Network Stats</h3>
            <p>Total Blocks: {blockchainData.total_blocks || 'Loading...'}</p>
            <p>Average Block Time: {blockchainData.average_block_time || 'Loading...'}</p>
        </div>
    );
};

export default BlockExplorer;