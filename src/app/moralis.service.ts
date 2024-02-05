import { Injectable } from '@angular/core';
import { getDefaultProvider } from 'ethers';
import { createClient,connect,disconnect,getAccount,InjectedConnector } from '@wagmi/core';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

export interface ResponseType{
  config:string,
  data:string,
  headers:string,
  requests:string,
}


@Injectable({
  providedIn: 'root'
})

export class MoralisService {
  [x: string]: any;
//Varaiables
  userSession:any
  chain:any
  tknPrice:any = [];
 
constructor(private loader:LoaderService ,private http:HttpClient) { }

// Creating wagmi Clinet
Client = createClient({
  autoConnect:true,
  provider:getDefaultProvider(),
});

// Get userDataSession from Metamask
async getUserData(){
  const { isConnected } = getAccount();
  if (isConnected) await disconnect();
  const provider = await connect({connector:new InjectedConnector})
  const UserData = {
  address:provider.account,
  chain:provider.chain.id,
  network:'evm',
  };
  this.userSession = UserData
  return UserData
}


// Get chain in string
getchain(){
  this.userSession.chain == 8001?this.chain = 'mumbai' : this.chain = 'eth';
// console.log(this.userSession)
};

// //Token Transfer Functions
async TransferTokens(walletAddress:string,amt:number,contractAddress:string,chain:string){
  this.getchain();
  console.log("Transaction in processs....")
  console.log(walletAddress,amt,contractAddress)
  try{
  let privateKey =  environment.PrivateKey;
  let sdk =  ThirdwebSDK.fromPrivateKey(privateKey, chain);
  await sdk.wallet.transfer(walletAddress, amt,contractAddress );
  console.log("Transactions completed..")
  // this.loader.isLoading.next(false)
  }
  catch(error){
  console.log(error)
  
  }
  this.loader.isLoading.next(false)
}

//Get all tokens for wallet
async getTokens(userData){
  const  value:any  = await axios.post(
    `${environment.SERVER_URL}/token`,
    userData
    ); 
    return value
  }
  
//  async blocks(dates,contract){
//     const blocks = await axios.post(`${environment.SERVER_URL}/blocks`,
//     dates);
//     const onlyBlocks = await blocks.data
//     // console.log("blocks from service",onlyBlocks)
//     const blooock = await onlyBlocks.map((e)=> e.block)
//     this.getHistroickTokenPrice(blooock,contract);
//   }


//   async getHistroickTokenPrice(blocks,contractAdd){
//     // console.log('address and block in service',blocks,contractAdd)
//     const value = {
//       address : contractAdd ,// address of token selected
//       block :blocks,
//     }    
//     this.tknPrice = await axios.post(`${environment.SERVER_URL}/MarketTokenPrice`,value);
//     let data = this.tknPrice.data;
//     data.forEach(element => {
//       this.tknPrice.push(element.usdPrice)
//     });
    
    // console.log("token price from blocks ",typeof(this.tknPrice));
   
    
  // }

  // async getTknPrice(){
  //   return this.tknPrice 
  // }


}
