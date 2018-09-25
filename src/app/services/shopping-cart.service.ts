import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    //**************
    // Constructor *
    //**************
    constructor(private m_database: AngularFireDatabase) { }

    //**********
    // Getters *
    //**********
    private get database() { return this.m_database; }


    async addToCart(product) {
        const observe = await this.cart();
        observe.subscribe(cart => {
            console.log(cart);

        });


    }


    // get a promise to the cart id
    private async cart() {
        // get the cart id
        let cart_id = localStorage.getItem('cartId');

        // if there isnt a cart create one
        cart_id = cart_id ? cart_id : await this.createCart();

        // create the cart if the id is null
        return this.database.object('/shopping-carts/ ' + cart_id).valueChanges();
    }

    // Create a cart in the database
    private createCart() {
        // create a new cart and return the promise
        return this.database.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }
}
