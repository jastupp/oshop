import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
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


    addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    removeFromCart(product: Product) {
        this.updateItem(product, -1);
    }

    async getCart(): Promise<Observable<ShoppingCart>> {
        const cart_id = await this.cartId();
        return this.database.object<ShoppingCart>('/shopping-carts/' + cart_id)
            .valueChanges()
            .pipe(
                map(cart => new ShoppingCart(cart.items ? cart.items : []))
            );
    }

    private async updateItem(product: Product, change: number) {
        const cart_id = await this.cartId();
        console.log('Update Item', product, change);
        const item$ = this.getItem(cart_id, product.key);

        item$.valueChanges()
            .pipe(take(1))
            .subscribe(item => {
                    console.log('Item = ', item);
                    console.log('Product.title = ', product.title);
                    console.log('Product.imageUrl = ', product.imageUrl);
                    console.log('Product.price = ', product.price);
                    item$.update({
                        title: product.title,
                        imageUrl: product.imageUrl,
                        price: product.price,
                        quantity: ((item && item['quantity']) || 0) + change
                    });
                }
            );
    }

    private getItem(cart_id: string, product_id: string) {
        return this.database.object('/shopping-carts/' + cart_id + '/items/' + product_id);
    }

    // get a promise to the cart id
    private async cartId(): Promise<string> {
        // get the cart id
        let cart_id;
        while((cart_id = localStorage.getItem('cartId')) === 'WAIT...') {
            await this.delay(200);
        }
        // if there isnt a cart create one
        return cart_id ? cart_id : await this.createCart();
    }

    // Create a cart in the database
    private createCart() {
        localStorage.setItem('cartId', 'WAIT...');

        // create a new cart and return the promise
        return this.database.list('/shopping-carts/').push({
            dateCreated: new Date().getTime()
        }).then(cart => {
            localStorage.setItem('cartId', cart.key);

            return cart.key;
        });
    }

    private async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
