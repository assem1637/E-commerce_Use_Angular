import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{


  productInfo:any = null;
  productId:any = "";

  constructor(private _WishlistService:WishlistService , private _ProductsService:ProductsService , private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){};

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe((param) => {

      this.productId = param.get("id");

    });
    
    this._ProductsService.getSpecificProduct(this.productId).subscribe({

      next: (res) => {

        console.log(res.data);
        
        this.productInfo = res.data;

      }, 


      error: (err) => {

        console.log(err);

      }

    })

  };


  addToCart(productId:string) {

    this._CartService.addToCart(productId).subscribe({

      next: (res) => {

        console.log(res);
        localStorage.setItem("cartId" , res.data._id);
        this._CartService.numberProductOfCart.next(res.numOfCartItems);

      },
      error: (err) => console.log(err)

    })

  };


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
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
