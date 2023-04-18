import { Component } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiError:string="";
  isLoading:boolean = false;

  constructor(private _AuthService:AuthService, private _Router:Router){};

  registerForm:FormGroup = new FormGroup({

    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(30)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),
    rePassword: new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),
    phone: new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  } , {validators: this.matchingPasswordAndRePassword});



  matchingPasswordAndRePassword(registerForm:any) {

    let Password = registerForm.get("password");
    let rePassword = registerForm.get("rePassword");

    if(Password.value === rePassword.value) {

      return null;

    } else {

      rePassword.setErrors({match: "Password and rePassword Doesn't Match"});
      return {match: "Password and rePassword Doesn't Match"};

    };

  };


  handleRegister(registerForm:any) {

    this.isLoading = true;

    this._AuthService.register(registerForm.value).subscribe({

      next: (res) => {

        this.isLoading = false;

        if(res.message === "success") {

          this._Router.navigate(["/login"]);

        };


      },


      error: (err) => {

        this.isLoading = false;

        if(err.error.message === "Account Already Exists") {

          this.apiError = err.error.message;

        } else if (err.error.message === "fail") {

          this.apiError = err.error.errors.msg;

        };

      }

    });

  };

}
