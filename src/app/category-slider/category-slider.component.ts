import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../Services/categories.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit{

  categoriesInfo:any = [];

  constructor(private _CategoriesService:CategoriesService) {};


  ngOnInit(): void {
    
    this._CategoriesService.getAllCategories().subscribe({

      next: (res) => {

        this.categoriesInfo = res.data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }


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
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 7
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

}
