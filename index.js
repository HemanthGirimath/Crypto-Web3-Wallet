const Moralis = require('moralis').default;
const { exec } = require('child_process');
const axios = require('axios');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(cookieParser());

// allow access to Angular app domain
app.use(
  cors({
    origin: process.env.ANGULAR_URL,
    credentials: true,
  })
);

const config = {
  domain: process.env.APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: process.env.ANGULAR_URL,
  timeout: 60,
};

// request message to be signed by client
app.post('/request-message', async (req, res) => {
  const { address, chain, network } = req.body;

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);   
  }
});

// verify message signed by client
app.post('/verify', async (req, res) => {
  try {
    const { message, signature } = req.body;

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw;

    const user = { address, profileId, signature };

    // create JWT token
    const token = jwt.sign(user, process.env.AUTH_SECRET);

    // set JWT cookie
    res.cookie('jwt', token, {
      httpOnly: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

// verify JWT cookie to allow access
app.get('/authenticate', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(403); // if the user did not send a jwt token, they are unauthorized

  try {
    const data = jwt.verify(token, process.env.AUTH_SECRET);
    res.json(data);
  } catch {
    return res.sendStatus(403);
  }
});

// remove JWT cookie
app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('jwt');
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(403);
  }
});
// Get Portofolio Balances for wallet
app.post('/balances',async(req,res)=>{
  const { address, chain } = req.body
  try{
    const balances  =  await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain
    })
    res.status(200).json(balances);
  }
  catch(error){
    console.log(error);
    res.status(500);
    res.json({ error: error.message });
  }
  
})
// Get Blocks from dates
app.post('/blocks',async(req, res)=>{
  const dates  = req.body //"[\"2023-01-06\",\"2023-01-07\",\"2023-01-08\",\"2023-01-09\",\"2023-01-10\",\"2023-01-11\"]"
  try{   
     const block = (dates.map(async(e)=> await Moralis.EvmApi.block.getDateToBlock({date:e})));
    const blocks = await Promise.all(block);
    res.status(200).json(blocks)
  }
  catch(error){
    console.log(error)
    res.status(500);
    res.json({error:error.message})
  }
})
//Get token Price by blocks 
app.post('/MarketTokenPrice',async(req, res)=>{
  const { address, block } = req.body

  try{
    const blocks = await Promise.all( await block.map(async(e)=>await Moralis.EvmApi.token.getTokenPrice({
      address,
      toBlock:e,
  })));
    res.status(200).json(blocks)
  }
  catch(error){
    console.log(error)
    res.status(500);
    res.json({error:error.message})
  }
})



// Get all Tokens values for wallet
app.post('/token',async(req,res)=>{
  const { address, chain } = req.body
  try{
    const balances  =  await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain
    })
    res.status(200).json(balances);
  }
  catch(error){
    console.log(error);
    res.status(500);
    res.json({ error: error.message });
  }
  
})

app.get('/execute-python-script', (req, res) => {
  // Execute the Python script
  exec('python D:\\sofwares\\projects\\web3.0\\python\\scrapper.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Assuming the Python script generates a JSON fileN
    const articles = require('D:\\sofwares\\projects\\web3.0\\Angular-moralis-auth\\src\\assets\\all_articles.json');
    res.json({ articles });
  });
});



const startServer = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};



startServer();
