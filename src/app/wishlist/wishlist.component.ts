import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../Services/wishlist.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  countOfWishlist:number = 0;
  productsOfWishlist:any;
  isLoader:boolean = false;

  constructor(private _WishlistService:WishlistService , private _CartService:CartService) {};


  ngOnInit(): void {
    
    this.isLoader = true;

    this._WishlistService.getWishlistOfUser().subscribe({

      next: (res) => {


        console.log(res , "ssa");
        this._WishlistService.countOfWishlist.next(res.count);
        this.countOfWishlist = this._WishlistService.countOfWishlist.value;
        this.productsOfWishlist = res.data;
        this.isLoader = false;

      },
      
      error: (err) => {

        console.log(err);
        
        this.isLoader = false;

      },

    });

  };


  addToCart(productId:string) {

    this._CartService.addToCart(productId).subscribe({

      next: (res) => {

        console.log(res);
        this._CartService.numberProductOfCart.next(res.numOfCartItems);
        localStorage.setItem("cartId" , res.data._id);

      },
      error: (err) => console.log(err)

    })

  };




  

  deleteFromWishlist(productId: string) {

    this._WishlistService.removeProductFromWishlist(productId).subscribe({

      next: (res) => {

        this.isLoader = true;
        console.log(res);
        this.productsOfWishlist = res.data;
        this.ngOnInit();
        setTimeout(() => {

          this.isLoader = false;

        } , 3000);        
        this._WishlistService.countOfWishlist.next(this._WishlistService.countOfWishlist.value -1);

      },
      
      error: (err) => console.log(err),

    })

  };


};
