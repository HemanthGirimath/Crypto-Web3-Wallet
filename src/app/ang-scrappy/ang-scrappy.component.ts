import { Component, OnInit } from '@angular/core';
import { ScrapperService } from '../scrapper.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface all_articles{
  title:string,
  link:string,
  published_date:string
}

@Component({
  selector: 'app-ang-scrappy',
  templateUrl: './ang-scrappy.component.html',
  styleUrls: ['./ang-scrappy.component.css']
})
export class AngScrappyComponent implements OnInit {
  currentPage: number = 1;
  articlesPerPage: number = 8;
  displayedArticles:all_articles[] = []
  maxArticles = 48;

  private jsonUrl = 'assets/all_articles.json';

  constructor(private scrappy:ScrapperService,private http:HttpClient){
    // interval(60000) // Interval in milliseconds (30 seconds)
    // .pipe(
    //   switchMap(async () => this.executeScript())
    // )
    // .subscribe((response) => {
    //   // Handle the response if needed
    //   console.log('Script executed successfully:', response);
    // });
  }

  executeScript() {
    this.scrappy.executePythonScript().subscribe(response => {
      console.log('Python script executed successfully', response);
    });
  }

  getData() {
    this.http.get<any>(this.jsonUrl).subscribe((data)=>{
      const modified_list = data.slice(0,this.maxArticles)
      // const dateModifiedList = modified_list.sort((a,b)=>)
      this.displayedArticles = modified_list;
    }
      
    );
 }

 
  ngOnInit() {
  this.getData();
 
  }

  
  }
