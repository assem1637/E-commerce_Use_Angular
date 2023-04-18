import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService{


  numberProductOfCart = new BehaviorSubject(0);

  headers: any = {

    token : localStorage.getItem("userToken")

  };

   

  constructor(private _HttpClient:HttpClient) { }



  addToCart(productId:string):Observable<any> {

    return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/cart" , {

        productId

    } , {

      headers: this.headers

    });

  };




  getUserCart():Observable<any> {

    return this._HttpClient.get("https://route-ecommerce.onrender.com/api/v1/cart" , {

      headers: this.headers

    });

  };



  deleteUserCart():Observable<any> {

    return this._HttpClient.delete("https://route-ecommerce.onrender.com/api/v1/cart" , {

      headers: this.headers

    });

  };



  deleteSpecificProductFromCart(productId:string):Observable<any> {

    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}` , {

      headers: this.headers

    });

  };



  updateSpecificProductInCart(productId:string , count:number):Observable<any>{

    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}` , {

      count

    }, {

      headers: this.headers

    });

  };


};
