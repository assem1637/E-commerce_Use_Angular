import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { BrandsService } from '../Services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit{

  productsInfo:any = [];
  brandId:any;
  searchTerm:string = "";
  isLoader:boolean = false;

  constructor(private _BrandsService:BrandsService, private _CartService:CartService , private _ActivatedRoute:ActivatedRoute , private _WishlistService:WishlistService){};


  ngOnInit(): void {

    this.isLoader = true;
    
    this._ActivatedRoute.paramMap.forEach((param) => {

      this.brandId = param.get("id");

    });

    this._BrandsService.getProductsOfSpecificBrand(this.brandId).subscribe({

      next: (res) => {

        console.log(res);
        this.productsInfo = res.data;
        this.isLoader = false;

      },
      
      error: (err) => console.log(err)
      

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
