import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalancesComponent } from './balances/balances.component';
import { SiginComponent } from './sigin/sigin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TransferTokenComponent } from './transfer-token/transfer-token.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { UserComponent } from './user/user.component';
import { IntercepterService } from './intercepter.service';
import { AngScrappyComponent } from './ang-scrappy/ang-scrappy.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
@NgModule({
  declarations: [
    AppComponent,
    BalancesComponent,
    SiginComponent,
    
    TransferTokenComponent,
    PriceChartComponent,
    LoaderComponent,
    UserComponent,
    AngScrappyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ScrollToModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:IntercepterService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
