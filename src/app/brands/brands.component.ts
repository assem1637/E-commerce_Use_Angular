import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../Services/brands.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  brandsInfo:any = [];

  isLoader:boolean = false;

  constructor(private _BrandsService:BrandsService , private _Router:Router) {};


  ngOnInit(): void {
    
    this.isLoader = true;

    this._BrandsService.getAllBrands().subscribe({

      next: (res) => {

        this.brandsInfo = res.data;
        this.isLoader = false;

      },

      error: (err) => {

        console.log(err);

      }

    });

  };



  navigateTo(brandId:string) {

    this._Router.navigate(["brandDetails",brandId]);

  };

}
