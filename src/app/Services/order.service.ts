import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  linkTheApp:string = window.location.origin;

  headers: any = {

    token : localStorage.getItem("userToken")

  };

  constructor(private _HttpClient:HttpClient) { }


  createCashOrder(shippingAddress:any , cartId:string):Observable<any> {

    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}` , {

        shippingAddress

    } , {

        headers: this.headers

    });

  };



  CheckoutSession(shippingAddress:any , cartId:string):Observable<any> {

    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=${this.linkTheApp}` , {

        shippingAddress

    } , {

        headers: this.headers

    });

  };



  getUserOrders(userId:string):Observable<any> {

    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`);

  };


}
