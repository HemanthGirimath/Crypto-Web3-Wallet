import { Component, OnInit } from '@angular/core';

import { MoralisService } from '../moralis.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  transferForm = new FormGroup({
    amt:new FormControl(''),
    To : new FormControl(''),
    Pay : new FormControl(''),
  })

  constructor(private service:MoralisService) { }
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
  // const chain = ((data.chain === 80001) ? 'mumbai' : 'eth')
  // const walletAddress = this.to.value;
  // const amt = this.AMT.value
  // const contractAddress = this.TknAddress.value;
  // this.service.TransferTokens(walletAddress,amt,contractAddress,chain);
 
  const token = await this.service.getTokens(data);
  this.token = await token.data
    
  }

  async onSubmit(){
  const data = await this.service.getUserData()
    const chain = ((data.chain === 80001) ? 'mumbai' : 'eth');
    const walletAddress = this.to.value;
    const amt = this.AMT.value
    const contractAddress = this.TknAddress.value;
  this.service.TransferTokens(walletAddress,amt,contractAddress,chain); 
  this.transferForm.reset(); 
  }

  ngOnInit() {
    this.tokenTransfer();
  }

}
