import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from '../shared/models/shopping-cart';

@Component({
    selector: 'app-shopping-cart-summary',
    templateUrl: './shopping-cart-summary.component.html',
    styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

    //*****************
    // Class Members **
    //*****************
    private m_cart: ShoppingCart;

    //***********
    // Getters **
    //***********
    get cart() { return this.m_cart; }

    //***********
    // Setters **
    //***********
    @Input('cart') set cart(value) { this.m_cart = value; }

}
