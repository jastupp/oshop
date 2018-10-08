import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { DataTableModule } from 'angular-6-datatable';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        DataTableModule,
        RouterModule.forChild([
            {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
            {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
            {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
            {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}
        ])
    ],
    declarations: [
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent
    ],
    providers: [
        AdminAuthGuardService
    ]
})
export class AdminModule {
}
