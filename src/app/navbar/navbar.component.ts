import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  srcLogo:string = "./assets/logo.svg";
  isLogin:boolean = false;
  numberProductOfMyCart: number = 0;
  numberProductOfMyWishlist: number = 0;

  constructor(private _AuthService:AuthService , private _CartService:CartService , private _WishlistService:WishlistService) {}


  ngOnInit(): void {


    this._WishlistService.getWishlistOfUser().subscribe({

      next: (res) => {


        console.log(res);
        this._WishlistService.countOfWishlist.next(res.count);
        this._WishlistService.countOfWishlist.subscribe((newValue)=> {

          console.log(newValue);
          
          this.numberProductOfMyWishlist = newValue;

        });

      },
      error: (err) => console.log(err)
      
    });



    this._CartService.getUserCart().subscribe({

      next: (res) => {

        console.log(res.numOfCartItems);
        this._CartService.numberProductOfCart.next(res.numOfCartItems);
        this._CartService.numberProductOfCart.subscribe((newValue)=> {

          this.numberProductOfMyCart = newValue;

        });

      },
      error: (err) => console.log(err)
      
    });

    
    this._AuthService.userInfo.subscribe(() => {

      if(localStorage.getItem("userToken")) {
        
        this.isLogin = true;
        this._AuthService.saveUserData();
  
      } else {

        this.isLogin = false;

      };

    });

  }


  LogOut() {

    this._AuthService.logOut();

  };


}
