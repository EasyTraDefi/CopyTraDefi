import express from 'express';
const router = express.Router();


  export const swapMaker =  async (req, res) => {
  try {
    
  } catch (error) {
    console.error('Error  swapping:', error);
    res.status(500).send('Error processing swap');
  }
};

