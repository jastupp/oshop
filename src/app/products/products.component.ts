import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

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

    //**************
    // Constructor *
    //**************
    constructor(private m_product_service: ProductService,
                private m_route: ActivatedRoute) { }

    //**********
    // Getters *
    //**********
    private get productService() { return this.m_product_service; }
    private get route() { return this.m_route; }
    get products() { return this.m_products; }
    get filtered() { return this.m_filtered; }
    get category() { return this.m_category; }

    //**********
    // Setters *
    //**********
    set filtered(value) { this.m_filtered = value; }
    set products(value) { this.m_products = value; }
    set category(value) { this.m_category = value; }


    ngOnInit() {

        this.productService.getAll().pipe(
            switchMap(products => {
                this.products = products;
                return this.route.queryParamMap;
            })
        ).subscribe(params => {
            this.category = params.get('category');
            this.filtered = (this.category) ?
                this.products.filter(product => product.data.category === this.category) :
                this.products;
        });
    }

}
