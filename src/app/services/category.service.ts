import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    //**************
    // Constructor *
    //**************
    constructor(private m_database: AngularFireDatabase) { }

    //**********
    // Getters *
    //**********
    private get database() { return this.m_database; }

    getCategories() {
        // return this.database.list('/category/',
        //     ref => ref.orderByKey())
        //     .valueChanges();
        return this.database.list('/category/', ref => ref.orderByChild('name'))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.key, data: c.payload.val()}));
                })
            );

    }
}
