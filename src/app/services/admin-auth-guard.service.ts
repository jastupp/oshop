import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return  this.m_auth_service; }


    canActivate() {
        return this.authService.user$.pipe(map(user => {
            return true;
        }));
    }
}
