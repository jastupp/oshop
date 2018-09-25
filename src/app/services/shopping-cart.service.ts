import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Product} from '../models/product';
import {map, take} from 'rxjs/operators';

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

    async addToCart(product: Product) {
        const cart_id = await this.cartId();
        console.log('Cart ID = ' + cart_id);
        const item$ = this.getItem(cart_id, product.key);

        console.log('item$ = ', item$);

        item$.valueChanges()
            .pipe( take(1) )
            .subscribe(item => {
                console.log('In here ... ', item);
                item$.update({ product: product.data, quantity: ((item && item['quantity']) || 0) + 1 });
            }
        );
    }

    async getCart() {
        const cart_id = await this.cartId();
        return this.database.object('/shopping-cart/' + cart_id).valueChanges();
    }

    private getItem(cart_id: string, product_id: string)
    {
        return this.database.object('/shopping-carts/' + cart_id + '/items/' + product_id);
    }

    // get a promise to the cart id
    private async cartId(): Promise<string> {
        // get the cart id
        const cart_id = localStorage.getItem('cartId');

        // if there isnt a cart create one
        return cart_id ? cart_id : await this.createCart();
    }

    // Create a cart in the database
    private createCart() {
        // create a new cart and return the promise
        return this.database.list('/shopping-carts/').push({
            dateCreated: new Date().getTime()
        }).then(cart => {
            localStorage.setItem('cartId', cart.key);
            return cart.key;
        });
    }
}
