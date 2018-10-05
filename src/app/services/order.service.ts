import {Injectable} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    //***************
    // Constructor **
    //***************
    constructor(private m_database: AngularFireDatabase,
                private m_shopping_cart_service: ShoppingCartService) {}

    //***********
    // Getters **
    //***********
    private get database() { return this.m_database; }
    private get shoppingCartService() { return this.m_shopping_cart_service; }


    getOrders() {
        return this.database.list('/orders').valueChanges();
    }

    async placeOrder(order) {
        const result = await this.database.list('/orders').push(order);
        this.m_shopping_cart_service.clearCart();
        return result;
    }
}
