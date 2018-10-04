import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    //****************
    // Class Members *
    //****************
    private m_products: Product[] = [];
    private m_filtered: Product[] = [];
    private m_category;
    private m_cart$: Observable<ShoppingCart>;

    //**************
    // Constructor *
    //**************
    constructor(private m_product_service: ProductService,
                private m_route: ActivatedRoute,
                private m_shopping_cart_service: ShoppingCartService) { }

    //**********
    // Getters *
    //**********
    private get productService() { return this.m_product_service; }
    private get route() { return this.m_route; }
    private get shoppingCartService() { return this.m_shopping_cart_service; }
    get products() { return this.m_products; }
    get filtered() { return this.m_filtered; }
    get category() { return this.m_category; }
    get cart$() { return this.m_cart$; }

    //**********
    // Setters *
    //**********
    set filtered(value) { this.m_filtered = value; }
    set products(value) { this.m_products = value; }
    set category(value) { this.m_category = value; }
    set cart$(value) { this.m_cart$ = value; }


    async ngOnInit() {
        console.log('Products Component ...');
        this.cart$ = await this.shoppingCartService.getCart();
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getAll().pipe(
            switchMap(products => {
                this.products = products;
                return this.route.queryParamMap;
            })
        ).subscribe(params => {
            this.category = params.get('category');
            this.applyFilter();
        });
    }

    private applyFilter() {
        this.filtered = (this.category) ?
            this.products.filter(product => product.category === this.category) :
            this.products;
    }

}
