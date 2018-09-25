import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
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
        const cart_id = await this.cart();
        console.log('Cart ID = ' + cart_id);
        const item$ = this.database.object('/shopping-carts/' +
            cart_id + '/items/' + product.key);

        console.log('item$ = ', item$);

        item$.valueChanges().pipe(
            take(1)
        ).subscribe(
           item => {
                console.log('In here ... ', item);
                if(item) {
                    item$.update({  quantity: item.quantity + 1 });
                } else {
                    item$.set({ product: product.data, quantity: 1 });
                }
            }
        );






        //observe.subscribe(cart_id => {
        //    console.log(cart_id);
        //});
    }

    // get a promise to the cart id
    private async cart() {
        // get the cart id
        const cart_id = localStorage.getItem('cartId');

        // if there isnt a cart create one
        return cart_id ? cart_id : await this.createCart();

        // create the cart if the id is null
        //return this.database.object('/shopping-carts/' + cart_id).valueChanges();
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
