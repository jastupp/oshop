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
    private m_shopping_cart;

    //**************
    // Constructor *
    //**************
    constructor(private m_shopping_cart_service: ShoppingCartService) { }

    //**********
    // Getters *
    //**********
    private get shoppingCartService() { return this.m_shopping_cart_service; }
    get shoppingCart() { return this.m_shopping_cart; }
    get product() { return this.m_product; }
    get showActions() { return this.m_show_actions; }

    //**********
    // Setters *
    //**********
    @Input('product') set product(value) { this.m_product = value; }
    @Input('show-actions') set showActions(value) { this.m_show_actions = value; }
    @Input('shopping-cart') set shoppingCart(value) { this.m_shopping_cart = value; }

    ngOnInit() { }


    getQuantity() {
        let result  = 0;

        if(this.shoppingCart) {
            const item = this.shoppingCart.itemMap[this.product.key];
            result = item ? item.quantity : result;
        }

        return result;
    }

    addToCart() {
        this.shoppingCartService.addToCart(this.product);
    }

    removeFromCart() {
        this.shoppingCartService.removeFromCart(this.product);
    }
}
