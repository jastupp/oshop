import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';
import {ShoppingCart} from '../shared/models/shopping-cart';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

    //*****************
    // Class Members **
    //*****************
    private m_cart$: Observable<ShoppingCart>;

    //***************
    // Constructor **
    //***************
    constructor(private m_shopping_cart_service: ShoppingCartService) {}

    //***********
    // Getters **
    //***********
    get shoppingCartService() { return this.m_shopping_cart_service; }
    get cart$() { return this.m_cart$; }

    //***********
    // Setters **
    //***********
    set cart$(value) { this.m_cart$ = value; }


    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart();
    }
}
