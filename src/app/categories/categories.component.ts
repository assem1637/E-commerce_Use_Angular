import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categoriesInfo:any = [];

  isLoader:boolean = false;

  constructor(private _CategoriesService:CategoriesService , private _Router:Router) {};


  ngOnInit(): void {
    
    this.isLoader = true;

    this._CategoriesService.getAllCategories().subscribe({

      next: (res) => {

        this.categoriesInfo = res.data;
        this.isLoader = false;

      },

      error: (err) => {

        console.log(err);

      }

    });

  };



  navigateTo(categoryId:string) {

    this._Router.navigate(["categoryDetails",categoryId]);

  };

  
}
