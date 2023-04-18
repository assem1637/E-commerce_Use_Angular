import { Component } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  apiError:string="";
  isLoading:boolean = false;

  constructor(private _AuthService:AuthService, private _Router:Router){};

  loginForm:FormGroup = new FormGroup({

    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),

  });


  handleLogin(loginForm:any) {

    this.isLoading = true;

    this._AuthService.login(loginForm.value).subscribe({

      next: (res) => {

        this.isLoading = false;

        if(res.message === "success") {

          localStorage.setItem("userToken" , res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(["/home"]);

        };


      },


      error: (err) => {

        this.isLoading = false;

        if(err) {

          console.log(err);
          
          this.apiError = err.error.message;

        };

      }

    });

  };


}
