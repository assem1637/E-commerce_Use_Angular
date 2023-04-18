import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  
  apiError:string = "";
  isLoading:boolean = false;
  
  ForgetPassword:FormGroup = new FormGroup({

    email: new FormControl(null , [Validators.required , Validators.email])

  });


  constructor(private _AuthService:AuthService , private _Router:Router) {};


  handleForgetPassword(ForgetPassword:FormGroup) {

    this.isLoading = true;

    console.log(ForgetPassword.value);
    this._AuthService.forgetPassword(ForgetPassword.value.email).subscribe({

      next: (res) => {
        
        console.log(res);
        this.isLoading = false;
        this._Router.navigate(["/verifyResetCode"]);
        localStorage.setItem("isSendCode", 'true');
        
      },

      error: (err) => {

        console.log(err);
        this.isLoading = false;
        this.apiError = err.error.message;

      }

    })
    
  };


};
