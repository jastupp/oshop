import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { User } from 'firebase';
import { AppUser } from '../models/app-user';
import {Observable} from 'rxjs';

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
        this.database.object('/users/' + user.uid).update({
            name: user.displayName,
            email: user.email
        });
    }

    get(uid: string): AngularFireObject<AppUser> {
        return this.database.object('/users/' + uid);
    }
}
