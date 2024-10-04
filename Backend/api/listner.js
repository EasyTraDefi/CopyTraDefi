import express from 'express';
const router = express.Router();


  export const listnerHandler =  async (req, res) => {
  try {
    const payload = req.body;
    let operation = "" ;
    let traderAddress= "" ;
    let tokenAddress= "" ;
    // Check if payload is an array and contains at least one object
    if (Array.isArray(payload) && payload.length > 0) {
      const transactionData = payload[0]; // Accessing the first object in the array

      // Check if tokenTransfers exists and is an array
      if (transactionData.tokenTransfers && Array.isArray(transactionData.tokenTransfers)) {
        // Filter where fromUserAccount is NOT 'So11111111111111111111111111111111111111112'
        const filteredTransfers = transactionData.tokenTransfers
          .filter(transfer => transfer.fromUserAccount !== 'So11111111111111111111111111111111111111112') // Filter based on fromUserAccount
          .map(transfer => ({
            fromUserAccount: transfer.fromUserAccount,
            mint: transfer.mint
          })); // Extract both fromUserAccount and mint

        console.log('Filtered Transfers:', filteredTransfers);

        // extract the the trader address
    traderAddress = filteredTransfers[0].fromUserAccount ;

    let mintAdd1 = filteredTransfers[0].mint ;
    let mintAdd2 = filteredTransfers[1].mint ;
    let tradedWithSol = 1 ;

    if(mintAdd1 === 'So11111111111111111111111111111111111111112'){
      operation = "buy";
      tokenAddress= mintAdd2 ;
    } else if (mintAdd2 === 'So11111111111111111111111111111111111111112'){
      operation= "sell";
      tokenAddress= mintAdd1 ;
    } else{
      tradedWithSol = 0 ;
    }
    

  console.log("the trader is :", traderAddress, " the operation is : ", operation, " and the token Address is :", tokenAddress);

  
      } else {
        console.log('No tokenTransfers found in the payload.');
      }

    } else {
      console.log('Payload is not in the expected format.');
    }
  
    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
};

