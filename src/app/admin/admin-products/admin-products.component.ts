import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

    //****************
    // Class Members *
    //****************
    private m_products: Product[];
    private m_filtered: Product[];
    private m_subscription: Subscription;

    //**************
    // Constructor *
    //**************
    constructor(private m_products_service: ProductService) { }

    //**********
    // Getters *
    //**********
    private get productsService() { return this.m_products_service; }
    get products() { return this.m_products; }
    get filtered() { return this.m_filtered; }
    get subscription() { return this.m_subscription; }

    //**********
    // Setters *
    //**********
    set products(value) { this.m_products = value; }
    set filtered(value) { this.m_filtered = value; }
    set subscription(value) { this.m_subscription = value; }

    ngOnInit() {
        this.subscription = this.productsService.getAll()
            .subscribe(products => this.filtered = this.products = products );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    filter(query: string) {
        this.filtered = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
    }
}
