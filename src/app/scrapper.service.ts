import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ScrapperService  {
  
  private apiUrl = 'http://localhost:3000';


  constructor(private http:HttpClient) { }

  executePythonScript() {
    return this.http.get<any[]>(`${this.apiUrl}/execute-python-script`);
  }

  
}

