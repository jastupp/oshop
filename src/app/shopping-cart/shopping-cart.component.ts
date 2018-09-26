import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    //*****************
    // Class Members **
    //*****************
    private m_cart$;

    //***************
    // Constructor **
    //***************
    constructor(private m_shopping_cart_service: ShoppingCartService) { }

    //***********
    // Getters **
    //***********
    private get shoppingCartService() { return this.m_shopping_cart_service; }
    get cart$() { return this.m_cart$; }

    //***********
    // Setters **
    //***********
    set cart$(value) { this.m_cart$ = value; }

    async ngOnInit() {
        this.cart$ = await this.m_shopping_cart_service.getCart();
    }

}
