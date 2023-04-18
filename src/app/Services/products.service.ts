import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }


  getAllProducts(page:number):Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products?page=${page}`);

  };



  getSpecificProduct(id:string):Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);

  };


}
