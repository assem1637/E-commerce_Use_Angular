import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProtectedRoutesGuard } from './protected-routes.guard';
import { ProtectedAuthGuard } from './protected-auth.guard';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ProtectedshippingAddressGuard } from './protectedshipping-address.guard';
import { OrdersComponent } from './orders/orders.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProtectedVerifyResetCodeGuard } from './protected-verify-reset-code.guard';
import { ProtectedResetPasswordGuard } from './protected-reset-password.guard';
import { WishlistComponent } from './wishlist/wishlist.component';



const routes: Routes = [

 {path: "", redirectTo: "home", pathMatch: "full"},
 {path: "home", canActivate:[ProtectedRoutesGuard] ,component: HomeComponent},
 {path: "cart", canActivate:[ProtectedRoutesGuard], component: CartComponent},
 {path: "allorders", canActivate:[ProtectedRoutesGuard], component: OrdersComponent},
 {path: "shippingAddress", canActivate:[ProtectedRoutesGuard , ProtectedshippingAddressGuard], component: ShippingAddressComponent},
 {path: "products", canActivate:[ProtectedRoutesGuard], component: ProductsComponent},
 {path: "productDetails/:id", canActivate:[ProtectedRoutesGuard], component: ProductDetailsComponent},
 {path: "wishlist", canActivate:[ProtectedRoutesGuard], component: WishlistComponent},
 {path: "categories", canActivate:[ProtectedRoutesGuard], component: CategoriesComponent},
 {path: "categoryDetails/:id", canActivate:[ProtectedRoutesGuard], component: CategoryDetailsComponent},
 {path: "brands", canActivate:[ProtectedRoutesGuard], component: BrandsComponent},
 {path: "brandDetails/:id", canActivate:[ProtectedRoutesGuard], component: BrandDetailsComponent},
 {path: "setting", canActivate:[ProtectedRoutesGuard], loadChildren: () => import('./setting/setting.module').then((x) => x.SettingModule)},
 {path: "login", canActivate: [ProtectedAuthGuard] ,component: LoginComponent},
 {path: "register", canActivate: [ProtectedAuthGuard] , component: RegisterComponent},
 {path: "forgetPassword", canActivate: [ProtectedAuthGuard] , component: ForgetPasswordComponent},
 {path: "verifyResetCode", canActivate: [ProtectedAuthGuard,ProtectedVerifyResetCodeGuard] , component: VerifyResetCodeComponent},
 {path: "resetPassword", canActivate: [ProtectedAuthGuard, ProtectedResetPasswordGuard] , component: ResetPasswordComponent},
 {path: "**", component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
