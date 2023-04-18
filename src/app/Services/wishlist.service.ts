import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  countOfWishlist = new BehaviorSubject(0);

  headers:any = {

    token: localStorage.getItem("userToken")

  };

  constructor(private _HttpClient:HttpClient) { };


  addProductToWishlist(productId:string):Observable<any> {

    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/wishlist` , {

      productId 

    }, {

      headers: this.headers

    });

  };



  removeProductFromWishlist(productId:string):Observable<any> {

    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}` , {

      headers: this.headers

    });

  };




  getWishlistOfUser():Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/wishlist` , {

      headers: this.headers

    });

  };


};
