import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { BrandSliderComponent } from './brand-slider/brand-slider.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchProductsByNamePipe } from './search-products-by-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    HomeSliderComponent,
    CategorySliderComponent,
    BrandSliderComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ShippingAddressComponent,
    OrdersComponent,
    CategoryDetailsComponent,
    BrandDetailsComponent,
    ForgetPasswordComponent,
    VerifyResetCodeComponent,
    ResetPasswordComponent,
    WishlistComponent,
    SearchProductsByNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
