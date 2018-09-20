import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService,
                private m_router: Router) { }

    //**********
    // Getters *
    //**********
    private get authService() { return this.m_auth_service; }
    private get router() { return this.m_router; }


    canActivate(route, state: RouterStateSnapshot) {
        return this.authService.user$.pipe(map(user => {
            if (!user) {
                this.router.navigate(['/login'], {
                    queryParams: {
                        returnUrl: state.url
                    }
                });
            }

            return !!user;
        }));
    }
}
