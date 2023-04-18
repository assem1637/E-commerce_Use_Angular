import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent {

  sliderImage1:string = "./assets/slider-image-1.jpeg";
  sliderImage2:string = "./assets/slider-image-2.jpeg";
  sliderImage3:string = "./assets/slider-image-3.jpeg";
  sliderImage4:string = "./assets/slider-image-4.jpeg";

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
  }

}
