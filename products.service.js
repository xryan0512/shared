import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private uri: 'http://localhost:4200';
  constructor(private http: HttpClient) { 

  }

  getData(){
    return this.http.get(`http://localhost:3000/data`);
  }

  upDate(obj){
    console.log("service update")
    return this.http.put(`http://localhost:3000/update`, obj).subscribe(() => {}, err => {
      console.log(err)
    });
  }
}
