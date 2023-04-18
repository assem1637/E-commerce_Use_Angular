import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  
  apiError:string = "";
  isLoading:boolean = false;
  
  resetPassword:FormGroup = new FormGroup({

    email: new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),

  });


  constructor(private _AuthService:AuthService , private _Router:Router) {};


  handleresetPassword(resetPassword:FormGroup) {

    this.isLoading = true;

    console.log(resetPassword.value);
    this._AuthService.resetPassword(resetPassword.value.email , resetPassword.value.newPassword).subscribe({

      next: (res) => {
        
        console.log(res);
        this.isLoading = false;
        this._Router.navigate(["/login"]);
        localStorage.removeItem("isSendCode");
        localStorage.removeItem("isValidCode");
        
      },

      error: (err) => {

        console.log(err);
        this.isLoading = false;
        this.apiError = err.error.message;

      }

    })
    
  };



}
