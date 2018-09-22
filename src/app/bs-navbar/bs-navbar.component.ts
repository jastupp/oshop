import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

    //****************
    // Class Members *
    //****************
    private m_app_user: AppUser;

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return this.m_auth_service; }
    get user$() { return this.authService.user$; }
    get appUser() { return this.m_app_user; }

    //**********
    // Setters *
    //**********
    set appUser(value) { this.m_app_user = value; }

    ngOnInit(): void {
        this.authService.appUser$.subscribe(user => this.m_app_user = user );
    }


    logout() {
        this.authService.logout();
        this.appUser = null;
    }
}
