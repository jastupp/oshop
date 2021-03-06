import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { EMPTY, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AppUser} from '../models/app-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //****************
    // Class Members *
    //****************
    private m_user$: Observable<User>;

    //**************
    // Constructor *
    //**************
    constructor(private m_user_service: UserService,
                private m_auth: AngularFireAuth,
                private m_route: ActivatedRoute) {
        // set the user observable
        this.user$ = this.auth.authState;
    }

    //**********
    // Getters *
    //**********
    private get auth() { return this.m_auth; }
    private get route() { return this.m_route; }
    private get userService() { return this.m_user_service; }

    get user$(): Observable<User> { return this.m_user$; }
    get appUser$(): Observable<AppUser> {
        return this.user$
            .pipe(switchMap(user => (user) ? this.userService.get(user.uid).valueChanges() : EMPTY ));
    }

    //**********
    // Setters *
    //**********
    set user$(value) { this.m_user$ = value; }


    login() {
        const return_url = this.route.snapshot.queryParamMap.get('returnUrl');
        localStorage.setItem('returnUrl', return_url);
        this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.auth.signOut();
    }

}
