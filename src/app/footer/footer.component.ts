import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  srcLogo:string = "./assets/logo.svg";
  amazonPay:string = "./assets/Amazon_Pay_logo.svg";
  american:string = "./assets/american-express.svg";
  appStore:string = "./assets/app-store.svg";
  googlePlay:string = "./assets/Google_Play.svg";
  masterCard:string = "./assets/MasterCard_Logo.svg";
  paypal:string = "./assets/PayPal.svg";


  welcome() {

    window.alert("Hello In FreshCart ♥");

  }

}
