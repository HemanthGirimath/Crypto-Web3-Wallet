import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { MoralisService } from '../moralis.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  session = '';
  nftData:any
  TokenContractAddress:any
  portFolioBalance:any
  walletAddress:any

  constructor(private router:Router,private http:HttpClient,private server:MoralisService) { }


  async signOut() {
    await axios.get(`${environment.SERVER_URL}/logout`, {
      withCredentials: true,
    });
    this.router.navigateByUrl('/signin');
  }
  
  async getBalances(){
    const Data = await this.server.getUserData();
    const userData={
      address:Data.address,
      chain:Data.chain,
      network:'evm',
    };
    const  value:any  = await axios.post(
      `${environment.SERVER_URL}/balances`,
      userData
    );
    const bal = value.data.balance/(1000000000000000000);
    this.portFolioBalance = bal.toFixed(2);
      // this.getTokens(userData);
    this.walletAddress = userData.address
  }
  
  // async getTokens(userData){
  // const  value:any  = await axios.post(
  //   `${environment.SERVER_URL}/token`,
  //   userData
  //   );
    // console.log(value)
  // }

  
  async ngOnInit() {
    this.getBalances();
  
    // this.server.getContracts().then(data=>{
    //   const getTokens = data;
    //   getTokens.map(x=>{
    //     if(x.contractType === "token"){
    //       this.TokenContractAddress = x
    //     }
    //     else{
    //      this.TokenContractAddress = data
    //     }
    //   })
    // })

    try {
      const { data } = await axios.get(
        `${environment.SERVER_URL}/authenticate`,
        {
          withCredentials: true,
        }
      );
  
      const { iat, ...authData } = data; // remove unimportant iat value
  
      this.session = JSON.stringify(authData, null, 2); // format to be displayed nicely
    } catch (err) {
      // if user does not have a "session" token, redirect to /signin
      this.router.navigateByUrl('/signin');
    }
  }



}
