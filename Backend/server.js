// app.js
// app.js
import express from 'express';
import { config } from 'dotenv';
import {listnerHandler} from './api/listner.js';
config();

const app = express();
const port = 3008;
app.use(express.json());

// const Listner = require('./api/listner');
app.post('/webhookListner', listnerHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
