import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return this.m_auth_service; }


    login() {
        this.authService.login();
    }
}
