import {config} from "dotenv";

config();

const HELIUS_URL= process.env.HELIUS_API;


const createWebhook = async () => {
    try {
      const response = await fetch(
       HELIUS_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          "webhookURL": "https://TestServer.test.repl.co/webhooks",
          "transactionTypes": ["Any"],
          "accountAddresses": ["A9caPY7vwdyhxvo9bsJd5hakH1CSEB6UvfyCexgE3Hdv"],
          "webhookType": "raw", // "rawDevnet"
          "txnStatus": "all", // success/failed
       }),
        }
      );
      const data = await response.json();
      console.log({ data });
      console.log( "  the url is : ", HELIUS_URL);
    } catch (e) {
      console.error("error", e);
    }
  };
  createWebhook();