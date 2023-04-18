import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsInfo:any = [];
  searchTerm:string = "";

  isLoader:boolean = false;


  constructor(private _WishlistService:WishlistService , private _ProductsService:ProductsService , private _CartService:CartService) {};


  ngOnInit(): void {

    this.isLoader = true;

    this._ProductsService.getAllProducts(1).subscribe({

      next: (res) => {

        this.productsInfo = res.data;
        this.isLoader = false;

      },

      error: (err) => {

        console.log(err);

      }

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



  select(productId:string) {

    let element = <HTMLElement>document.getElementById(productId);
    let classes = Array.from(element.classList);
      
    
    if(classes.includes("fa-regular")) {
  
      element.classList.replace("fa-regular" , "fa-solid");
      this.addToWishList(productId);
  
    } else {
  
      element.classList.replace("fa-solid" , "fa-regular");
      this.removeFromWishList(productId);
  
    };
  
  
  }
  
  
    addToWishList(productId:string) {
  
  
  
      this._WishlistService.addProductToWishlist(productId).subscribe({
  
        next: (res) => {
  
          
          console.log(res);
          this._WishlistService.countOfWishlist.next(res.data.length);
  
        },
        
        error: (err) => console.log(err)
        
  
      });
  
    };
  
  
  
    removeFromWishList(productId:string) {
  
      this._WishlistService.removeProductFromWishlist(productId).subscribe({
  
        next: (res) => {
  
          console.log(res);
          this._WishlistService.countOfWishlist.next(res.data.length);
  
        },
        
        error: (err) => console.log(err)
        
  
      });
  
    };
  



}
