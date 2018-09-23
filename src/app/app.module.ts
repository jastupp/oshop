import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
    declarations: [
        AppComponent,
        BsNavbarComponent,
        HomeComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule,
        DataTableModule,
        CustomFormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'shopping-cart', component: ShoppingCartComponent },
            { path: 'login', component: LoginComponent },

            { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
            { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
            { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },

            { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] }
        ])
    ],
    providers: [
        AdminAuthGuardService,
        AuthGuardService,
        AuthService,
        CategoryService,
        UserService,
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
