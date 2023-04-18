import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , BehaviorSubject} from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  userInfo = new BehaviorSubject(null);

  headers: any = {

    token : localStorage.getItem("userToken")

  };

  saveUserData() {

    let token = localStorage.getItem("userToken");

    if(token) {

      let decodedToken:any = jwt_decode(token);
      this.userInfo.next(decodedToken);

    };

  };


  constructor(private _HttpClient:HttpClient , private _Router:Router) {};


  ngOnInit(): void {
    
    if(localStorage.getItem("userToken")) {

      this.saveUserData();

    };


    this.userInfo.subscribe(() => {

      setTimeout(() => {

        if(localStorage.getItem("userToken")) {
  
          this.logOut();
  
        };
  
      } , 86400000);

    });


  }


  register(userData:object):Observable<any> {

   return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signup" , userData);

  };


  login(userData:object):Observable<any> {

    return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signin" , userData);

  };



  logOut() {

    localStorage.clear();
    this.userInfo.next(null);
    this._Router.navigate(["/login"]);

  };


  forgetPassword(email:string):Observable<any> {

    return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords" , {
      email:email
    });

  };


  verifyResetCode(code:string):Observable<any> {

    return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode" , {
      resetCode:code
    });

  };



  resetPassword(email:string , newPassword:string):Observable<any> {

    return this._HttpClient.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword" , {
     
      email: email,
      newPassword: newPassword

    });

  };



  changePassword(userData:object):Observable<any> {

    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword` , userData , {

        headers: this.headers

    })

  };

};
