import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {

  
  apiError:string = "";
  isLoading:boolean = false;
  
  VerifyResetCode:FormGroup = new FormGroup({

    resetCode: new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])

  });


  constructor(private _AuthService:AuthService , private _Router:Router) {};


  handleVerifyResetCode(VerifyResetCode:FormGroup) {

    this.isLoading = true;

    console.log(VerifyResetCode.value);
    this._AuthService.verifyResetCode(VerifyResetCode.value.resetCode).subscribe({

      next: (res) => {
        
        console.log(res);
        this.isLoading = false;
        this._Router.navigate(["/resetPassword"]);
        localStorage.setItem("isValidCode", 'true');
        
      },

      error: (err) => {

        console.log(err);
        this.isLoading = false;
        this.apiError = err.error.message;

      }

    })
    
  };



}
