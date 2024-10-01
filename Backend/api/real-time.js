const axios = require('axios');
let data = JSON.stringify({
    "query": "subscription {\n  Solana {\n    DEXTrades {\n      Trade {\n        Dex {\n          ProgramAddress\n          ProtocolFamily\n          ProtocolName\n        }\n        Buy {\n          Amount\n          Account {\n            Address\n          }\n          Currency {\n            MetadataAddress\n            Key\n            IsMutable\n            EditionNonce\n            Decimals\n            CollectionAddress\n            Fungible\n            Symbol\n            Native\n            Name\n          }\n          Order {\n            LimitPrice\n            LimitAmount\n            OrderId\n          }\n        }\n        Market {\n          MarketAddress\n        }\n        Sell {\n          Account {\n            Address\n          }\n          Currency {\n            MetadataAddress\n            Key\n            IsMutable\n            EditionNonce\n            Decimals\n            CollectionAddress\n            Fungible\n            Symbol\n            Native\n            Name\n          }\n        }\n      }\n      Instruction {\n        Program {\n          Address\n          AccountNames\n          Method\n          Parsed\n          Name\n        }\n      }\n    }\n  }\n}",
    "variables": "{}"
});

let config = {
    method: 'post',
    maxBodyLength: 2000,
    url: 'https://streaming.bitquery.io/eap',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYA9UfUMoFfml4aVGj3vtBRVJsPogg2',
        'Authorization': 'Bearer ory_at_Hb6TNtP5UGKJjUQtj1TkBCCXIwDhoHwibVZbR6Q6eoA.lFIQdN0fTzDvZWHGmYQH0B-XWjfbCStOtv7bW5Ju2vs'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });