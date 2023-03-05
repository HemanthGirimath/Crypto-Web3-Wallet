import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  constructor() { }
  
  address = '';
  nativeBalance = '';
  tokenBalances = '';

  async ngOnInit() {
    const { data } = await axios(`http://localhost:3000/balances`);
    
  this.address = data.address;
  this.nativeBalance = data.nativeBalance;
  this.tokenBalances = data.tokenBalances;
  }

}
