import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  cartLoader:boolean = true;

  ngOnInit(): void {
    
    setTimeout(() => {

      this.cartLoader = false;

    } , 3000)

  }


}
