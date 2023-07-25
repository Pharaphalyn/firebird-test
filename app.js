const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/getFirebirdQuote', getFirebirdQuote);

const ROUTER_API = 'https://router.firebird.finance/aggregator/v1/route';
const API_KEY = 'firebird_d3_prod_180723';

async function getFirebirdQuote(req, res) {

  // Example params
  // const params = {
  //     from: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  //     to: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  //     amount: '1000000',
  //     receiver: '0x6c021ae822bea943b2e66552bde1d2696a53fbb7'
  // };

  const params = req.query;
  params.chainId = 42161;

  //Supposed to use Firebird's default slippage so no reason to pass it here
  delete params.slippage;
  
  params.source = 'whatever';
  if (!params.deadline) {
    params.deadline = +(new Date()) + 500;
  }
  try {
    const { data } = await axios.get(ROUTER_API, {
      headers: {
        'API-KEY': API_KEY,
        'Content-Type': 'application/json'
      },
      params
    });
    res.send(data);
  } catch (e) {
    res.status(400).send({text: 'Available fields: from, to, amount, receiver, deadline.', error: e});
  }
}

app.listen(port);