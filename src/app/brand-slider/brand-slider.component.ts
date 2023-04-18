import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../Services/brands.service';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.css']
})
export class BrandSliderComponent implements OnInit{

  brandsInfo:any[] = [];

  constructor(private _BrandsService:BrandsService) {};


  ngOnInit(): void {
    
    this._BrandsService.getAllBrands().subscribe({

      next: (res) => {

        this.brandsInfo = res.data;

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
