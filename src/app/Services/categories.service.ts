import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories`);

  };


  getProductsOfSpecificCategory(id:string):Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products?category=${id}`);

  };


}
