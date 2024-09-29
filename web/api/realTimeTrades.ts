// File: web/api/realTimeTrades.ts

import WebSocket from 'ws';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { IncomingMessage } from 'http'; // Add this import

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    ws.on('message', (message: WebSocket.Data) => {
      ws.send(JSON.stringify(message));
    });
  });

  // Set up WebSocket client to fetch data from BitQuery
  const bitqueryClient = new WebSocket('wss://streaming.bitquery.io/eap');

  bitqueryClient.on('open', () => {
    console.log('BitQuery WebSocket connected');
    sendInitialData(bitqueryClient);
  });

  bitqueryClient.on('message', (event: WebSocket.MessageEvent) => {
    const data = JSON.parse(event.data.toString());
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  bitqueryClient.on('error', (error: Error) => {
    console.error('BitQuery WebSocket error:', error);
  });

  bitqueryClient.on('close', () => {
    console.log('BitQuery WebSocket disconnected');
  });

  // Function to send initial data to clients
  function sendInitialData(client: WebSocket) {
    const axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://streaming.bitquery.io/eap',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.BITQUERY_API_URL,
        'Authorization': process.env.BITQUERY_AUTH_TOKEN
      },
      data: JSON.stringify({
        query: `
        subscription {
          Solana {
            DEXTrades(
              where: {Trade: {Dex: {ProgramAddress: {is: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"}}}}
            ) {
              Trade {
                Dex {
                  ProgramAddress
                  ProtocolFamily
                  ProtocolName
                }
                Buy {
                  Account {
                    Address
                  }
                  Amount
                  Currency {
                    MintAddress
                    Decimals
                    Symbol
                    ProgramAddress
                    Name
                  }
                  PriceAgaistSellCurrency: Price
                }
                Sell {
                  Account {
                    Address
                  }
                  Amount
                  Currency {
                    MintAddress
                    Decimals
                    Symbol
                    Name
                  }
                  PriceAgaistBuyCurrency: Price
                }
              }
              Block {
                Time
                Height
              }
              Transaction {
                Signature
                FeePayer
                Signer
              }
            }
          }
        }
        
        `,
        variables: '{}'
      })
    };

    axios.request(axiosConfig)
      .then((response) => {
        console.log('Initial data received from BitQuery:', JSON.stringify(response.data));
        client.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Error fetching initial data:', error);
      });
  }

  // Handle WebSocket connection
  if (req.headers['upgrade'] === 'websocket') {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws: WebSocket) => {
      wss.emit('connection', ws, req);
    });
  } else {
    res.status(400).send('WebSocket upgrade required');
  }
}