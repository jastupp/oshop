import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return this.m_auth_service; }
    get user$() { return this.authService.user$; }

    logout() {
        this.authService.logout();
    }
}
