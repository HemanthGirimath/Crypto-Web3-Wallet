import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { MoralisService } from '../moralis.service';
import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

interface Token {
  symbol:any,
  Price :any
  tokenAddress:any
}
@Component({
  selector: 'app-transfer-token',
  templateUrl: './transfer-token.component.html',
  styleUrls: ['./transfer-token.component.css']
})
export class TransferTokenComponent implements OnInit {
  sendBtnClicked:boolean = true
  reciveBtnClicked:boolean = false
  TokenData:any
  selectedValue:any
  portFolioBalance:any

  transferForm = new FormGroup({
    amt:new FormControl(''),
    To : new FormControl(''),
    Pay : new FormControl(''),
  })

  constructor(private service:MoralisService, public loader:LoaderService) { }
  token:any

  sendTransaction(){
    this.sendBtnClicked = true
    this.reciveBtnClicked = false
  }

  reciveTransaction(){
    this.sendBtnClicked = false
    this.reciveBtnClicked = true
  }


  get to():FormControl{
    return this.transferForm.get('To') as FormControl;
  }

  get TknAddress():FormControl{
    return this.transferForm.get('Pay') as FormControl;
  }
  get AMT():FormControl{
    return this.transferForm.get('amt') as FormControl;
  }

  
  
  async tokenTransfer(){
  const data = await this.service.getUserData()
  const token = await this.service.getTokens(data);
  this.token = await token.data
  }

  async onSubmit(){
    this.loader.isLoading.next(true)
    const data = await this.service.getUserData()
    const chain =data.chain
    const walletAddress = this.to.value;
    const amt = this.AMT.value
    const contractAddress = this.TknAddress.value;
  this.service.TransferTokens(walletAddress,amt,contractAddress,chain); 
  this.transferForm.reset(); 

  }
  async getbalances(){
    const Data = await this.service.getUserData();
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
  }

  ngOnInit() {
    this.tokenTransfer();
    this.getbalances();
  }

}
