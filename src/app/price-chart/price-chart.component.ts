import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { MoralisService } from '../moralis.service';
import { FormGroup, FormControl } from '@angular/forms';
import Chart from 'Chart.js/auto';
import axios from 'axios';
import { environment } from 'src/environments/environment';

interface coins {
  token: string;
  contractAddress: string;
}


@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {
  days:any
  PriceData:any =[];

  @ViewChild('canvas') chart:any;
  constructor(private service:MoralisService) { }

  GraphForm = new FormGroup({
    tkn : new FormControl(''),
    day  : new FormControl(''),
  })

  tokens:coins[] = [
    {token:'USDT', contractAddress:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {token:'BUSD', contractAddress:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {token:'SHIB', contractAddress:'0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'},
    {token:'WBTC', contractAddress:'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'},
    {token:'MATIC', contractAddress:'0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'},
  ]

  get Days():FormControl{
    return this.GraphForm.get('day') as FormControl
  }
  get cntAddress():FormControl{
    return this.GraphForm.get('tkn') as FormControl
  }


  getData(){
    const date = new Date()
    const dates:any = Array(Number(this.Days.value)).fill(date).map((e,i)=>moment().subtract(i,"d").format("YYYY-MM-DD")).reverse();
    this.days = dates
     this.blocks(dates,this.cntAddress.value);
  }

    
 async blocks(dates,contract){
  const blocks = await axios.post(`${environment.SERVER_URL}/blocks`,
  dates);
  const onlyBlocks = await blocks.data
  // console.log("blocks from service",onlyBlocks)
  const blooock = await onlyBlocks.map((e)=> e.block)
  this.getHistroickTokenPrice(blooock,contract);
}


async getHistroickTokenPrice(blocks,contractAdd){
  // console.log('address and block in service',blocks,contractAdd)
  const value = {
    address : contractAdd ,// address of token selected
    block :blocks,
  }    
  const PriceData = await axios.post(`${environment.SERVER_URL}/MarketTokenPrice`,value);
  let data = PriceData.data;
  data.forEach(element => {
    this.PriceData.push(element.usdPrice)
   
  });

    if(this.chart != null){
          this.chart.destroy();
         }
         this.chart = new Chart('canvas',{
          type:'line',
          data:{
            labels:this.days,
            datasets:[{
              label:"Historic Price Data",
              data:this.PriceData,
              borderWidth:2,
              fill:false,
              borderColor:'rgb(75,`92,192)',
            }]
          }
        })
}

  async price(){
    this.getData();
  }

  ngOnInit() {
   
  }

}
