import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  visaLogo:string = "./assets/visa.svg";
  isOnlinePayment:any;

  userCart:any = null;
  isLoader:boolean = false;

  constructor(private _CartService:CartService){};

  onlinePayment(value:boolean) {

    this.isOnlinePayment = value;
    localStorage.setItem("onlinePayment", this.isOnlinePayment);

  };


  ngOnInit(): void {
    
    this.isLoader = true;

    this._CartService.getUserCart().subscribe({

      next: (res) => {

        this.userCart = res.data;
        this._CartService.numberProductOfCart.next(res.data.products.length);
        
        
        this.isLoader = false;

      },
      error: (err) => {

        this.isLoader = false;
        console.log(err);

      }
      
    })

  };



  clearAllProductsFromCart() {

    this._CartService.deleteUserCart().subscribe({

      next: (res) => {

        console.log(res.data);
        this.userCart = res.data;
        this._CartService.numberProductOfCart.next(0);
        this.ngOnInit();

      },
      error: (err) => console.log(err)

    })

  };



  deleteSpecificProductFromCart(productId:string) {

    this._CartService.deleteSpecificProductFromCart(productId).subscribe({

      next: (res) => {

        console.log(res.data);
        this.userCart = res.data;
        this._CartService.numberProductOfCart.next(res.numOfCartItems);
        this.ngOnInit();

      },
      error: (err) => console.log(err)

    });

  };


  updateSpecificProductInCart(productId:string , count:number) {

    if(count === 0) {

      this.deleteSpecificProductFromCart(productId);

    } else {


        this._CartService.updateSpecificProductInCart(productId,count).subscribe({

          next: (res) => {

            console.log(res.data);
            this.userCart = res.data;

          },
          error: (err) => console.log(err)

        })

      };


    };

};
