import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    //**************
    // Constructor *
    //**************
    constructor(private m_database: AngularFireDatabase) { }

    //**********
    // Getters *
    //**********
    private get database() { return this.m_database; }

    save(user: User) {
        console.log('start save ...');
        this.database.object('/users/' + user.uid).update({
            name: user.displayName,
            email: user.email
        });
        console.log('Finished save ...');
    }
}
