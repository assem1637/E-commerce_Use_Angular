import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/brands`);

  };


  getProductsOfSpecificBrand(brandId:string):Observable<any>{

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products?brand=${brandId}`);

  };


};
