import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{


  ordersOfCart:any = [];
  totalPrice: number = 0;
  userId:any;
  isLoader:boolean = false;
  

  constructor(private _OrderService:OrderService){};


  ngOnInit(): void {

    this.isLoader = true;

    if(localStorage.getItem("userToken")) {

      let token:any = localStorage.getItem("userToken");
      let decodedToken:any = jwt_decode(token);
      this.userId = decodedToken.id;

    };

    
    this._OrderService.getUserOrders(this.userId).subscribe({

      next: (res) => {

        res.forEach((order:any) => {

          this.ordersOfCart.push({

            totalOrderPrice: order.totalOrderPrice,
            isPaid: order.isPaid,
            isDelivered: order.isDelivered,
            cartItems: order.cartItems,

          })

        });


        this.ordersOfCart.map((order:any) => {

          this.totalPrice += order.totalOrderPrice

        });

        console.log(this.ordersOfCart);
        
        this.isLoader = false;

      },

      error: (err) => {

        console.log(err);
        this.isLoader = false;
        
      }

    });

  }

}
