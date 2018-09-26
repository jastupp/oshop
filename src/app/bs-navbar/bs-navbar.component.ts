import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

    //****************
    // Class Members *
    //****************
    private m_app_user: AppUser;
    private m_cart$: Observable<ShoppingCart>;

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService,
                private m_shopping_cart_service: ShoppingCartService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return this.m_auth_service; }
    private get shoppingCartService() { return this.m_shopping_cart_service; }
    get user$() { return this.authService.user$; }
    get cart$() { return this.m_cart$; }
    get appUser() { return this.m_app_user; }

    //**********
    // Setters *
    //**********
    set appUser(value) { this.m_app_user = value; }
    set cart$(value) { this.m_cart$ = value; }

    async ngOnInit() {
        this.authService.appUser$.subscribe(user => this.m_app_user = user );
        this.cart$ = await this.shoppingCartService.getCart();
    }

    logout() {
        this.authService.logout();
        this.appUser = null;
    }
}
