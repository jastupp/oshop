import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from '../shared/components/product-quantity/product-quantity.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AuthService } from '../shared/services/auth.service';
import { CategoryService } from '../shared/services/category.service';
import { OrderService } from '../shared/services/order.service';
import { UserService } from '../shared/services/user.service';
import { ProductService } from '../shared/services/product.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AdminAuthGuardService } from '../admin/services/admin-auth-guard.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ProductCardComponent,
        ProductQuantityComponent
    ],
    exports: [
        ProductCardComponent,
        ProductQuantityComponent
    ],
    providers: [
        AuthGuardService,
        AuthService,
        CategoryService,
        OrderService,
        UserService,
        ProductService,
        ShoppingCartService
    ]
})
export class SharedModule {
}
