import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    //****************
    // Class Members *
    //****************
    private m_product: Product;
    private m_show_actions = true;

    //**************
    // Constructor *
    //**************
    constructor(private m_shopping_cart_service: ShoppingCartService) { }

    //**********
    // Getters *
    //**********
    private get shoppingCartService() { return this.m_shopping_cart_service; }
    get product() { return this.m_product; }
    get showActions() { return this.m_show_actions; }

    //**********
    // Setters *
    //**********
    @Input() set product(value) { this.m_product = value; }
    @Input() set showActions(value) { this.m_show_actions = value; }

    ngOnInit() { }


    addToCart(product: Product) {
        this.shoppingCartService.addToCart(product);
    }
}