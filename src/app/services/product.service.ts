import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    //**************
    // Constructor *
    //**************
    constructor(private m_database: AngularFireDatabase) { }

    //**********
    // Getters *
    //**********
    private get database() { return this.m_database; }


    create(product: Product) {
        return this.database.list('/products').push(product);
    }

    getAll(): Observable<Product[]> {
        return this.database.list('/products')
            .snapshotChanges().pipe(
                map(products => {
                    return products.map(p => ({
                        key: p.payload.key,
                        title: p.payload.val()['title'],
                        price: p.payload.val()['price'],
                        category: p.payload.val()['category'],
                        imageUrl: p.payload.val()['imageUrl']
                    }) as Product );
                })
        );
    }


    get(product_id): Observable<Product> {
        return this.database.object('/products/' + product_id)
            .valueChanges()
            .pipe(
                map(p => {
                    return ({
                        key: product_id,
                        title: p['title'],
                        price: p['price'],
                        category: p['category'],
                        imageUrl: p['imageUrl']
                    }) as Product;
                })
            );
    }


    update(product_id, product: Product) {
        return this.database.object('/products/' + product_id).update(product);
    }

    delete(productId) {
        return this.database.object('/products/' + productId).remove();
    }
}
