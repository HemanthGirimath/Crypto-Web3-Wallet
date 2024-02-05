import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancesComponent } from './balances/balances.component';
import { SiginComponent } from './sigin/sigin.component';
import { TransferTokenComponent } from './transfer-token/transfer-token.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'balances',component:BalancesComponent},
  {path:'signin',component:SiginComponent},
  {path:'user',component:UserComponent},
  {path:'transfer',component:TransferTokenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}

