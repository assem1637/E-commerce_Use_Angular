import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { CategoriesService } from '../Services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../Services/wishlist.service';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{

  productsInfo:any = [];
  categoryId:any;
  searchTerm:string = "";
  isLoader:boolean = false;

  constructor(private _WishlistService:WishlistService , private _CategoriesService:CategoriesService, private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){};


  ngOnInit(): void {
    
    this.isLoader = true;

    this._ActivatedRoute.paramMap.forEach((param) => {

      this.categoryId = param.get("id");

    });

    this._CategoriesService.getProductsOfSpecificCategory(this.categoryId).subscribe({

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
