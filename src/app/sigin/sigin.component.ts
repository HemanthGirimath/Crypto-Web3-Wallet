import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// for making HTTP requests
import axios from 'axios';
import { signMessage } from '@wagmi/core';
import { environment } from 'src/environments/environment';
import { MoralisService } from '../moralis.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  portFolioBalance:number
  constructor(private router:Router, private service:MoralisService) { }
  
  
  
  async handleAuth() {
    const Data = await this.service.getUserData();

    const userData={
      address:Data.address,
      chain:Data.chain,
      network:'evm',
    };

    // const  value:number  = await axios.post(
    //   `${environment.SERVER_URL}/balances`,
    //   userData
    // );
    // this.portFolioBalance = value/(10*8);
    
    const { data } = await axios.post(
      `${environment.SERVER_URL}/request-message`,
      userData
    );

    const message = data.message;

    const signature = await signMessage({ message });

    await axios.post(
      `${environment.SERVER_URL}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    // redirect to /user
    this.router.navigateByUrl('user');
  }

 

  ngOnInit() {
    
  }

}
