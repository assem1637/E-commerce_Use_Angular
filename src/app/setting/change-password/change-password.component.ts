import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  apiError:string = "";
  sucessChangePassword:string = "";
  isLoading: boolean = false;
  token:any;


  changeMyPassword:FormGroup = new FormGroup({

    currentPassword: new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),
    password: new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),
    rePassword: new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z][a-z0-8@#$%^&*_-~`]{5,50}$/)]),

  } , {validators: this.matchingPasswordAndRePassword});



  matchingPasswordAndRePassword(changeMyPassword:any) {

    let newPassword = changeMyPassword.get('password');
    let newRePassword = changeMyPassword.get('rePassword');

    if(newPassword?.value === newRePassword?.value) {

      return null;

    } else {

      newRePassword?.setErrors({matching: "New Password and New rePassword Doesn't Match"});
      return {matching: "New Password and New rePassword Doesn't Match"};

    };
 
  };



  constructor(private _AuthService:AuthService) {};


  handleChangeMyPassword(changeMyPassword:any) {

    console.log(changeMyPassword.value);
    this.isLoading = true;

    this._AuthService.changePassword(changeMyPassword.value).subscribe({

      next: (res) => {

        console.log(res);
        this.isLoading = false;
        this.sucessChangePassword = "Success Change Password";
        localStorage.setItem("userToken", res.token);

      },

      error: (err) => {

        console.log(err);
        this.isLoading = false;
        this.apiError = "Current Password Is Wrong! Please Try Again";

      }
      

    })

  };

}
