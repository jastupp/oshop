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


    create(product) {
        return this.database.list('/products').push(product);
    }

    getAll(): Observable<Product[]> {
        return this.database.list('/products')
            .snapshotChanges().pipe(
                map(products => {
                    return products.map(p => ({ key: p.payload.key, data: p.payload.val()}) as Product );
                })
        );
    }


    get(product_id) {
        return this.database.object('/products/' + product_id).valueChanges();
    }


    update(product_id, product) {
        return this.database.object('/products/' + product_id).update(product);
    }

    delete(productId) {
        return this.database.object('/products/' + productId).remove();
    }
}
