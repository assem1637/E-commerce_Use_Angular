import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms';
import { OrderService } from '../Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {

  cartId: any = localStorage.getItem("cartId");
  isOnlinePayment: any = localStorage.getItem("onlinePayment");


  constructor(private _OrderService:OrderService , private _Router:Router) {};

  shippingAddress:FormGroup = new FormGroup({

    details: new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),

  });


  nagivateToUrl(url:string) {

    window.location.replace(url);

  };


  handleCashOrder(shippingAddress:FormGroup) {

    console.log(shippingAddress.value);

    this._OrderService.createCashOrder(shippingAddress.value , this.cartId).subscribe({

      next: (res) => {

        console.log(res);
        if(res.status === "success") {

          localStorage.removeItem("cartId");
          this._Router.navigate(["/home"]);

        }

      },

      error: (err) => {

        console.log(err);
        

      }

    });
    
  };

  handleOnlineOrder(shippingAddress:FormGroup) {

    console.log(shippingAddress.value);

    this._OrderService.CheckoutSession(shippingAddress.value , this.cartId).subscribe({

      next: (res) => {

        console.log(res);
        if(res.status === "success") {

          localStorage.removeItem("cartId");
          this.nagivateToUrl(res.session.url);

        }

      },

      error: (err) => {

        console.log(err);
        

      }

    });
    
  };




  handleSubmit(shippingAddress:FormGroup) {

    if(this.isOnlinePayment === 'true') {

      return this.handleOnlineOrder(shippingAddress);

    } else {

      return this.handleCashOrder(shippingAddress);

    };

  };

}
