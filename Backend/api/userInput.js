import express from 'express';
const router = express.Router();

export const userInputHandler = async (req, res) => {
    const { traderAddress, copyPercentage, symbol, userAddress } = req.body; // Destructure incoming data

    // Validate that the data is received
    if (!traderAddress || !copyPercentage || !symbol || !userAddress) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    console.log('Received data:', { traderAddress, copyPercentage, symbol, userAddress });

    // Here you could add more logic to process the received data (e.g., storing it in a database, further calculations, etc.)
    
    // Respond back to the client
    res.status(200).json({ message: 'User input data received successfully', receivedData: { traderAddress, copyPercentage, symbol, userAddress } });
};
