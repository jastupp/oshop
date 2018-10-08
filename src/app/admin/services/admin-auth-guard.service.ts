import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from 'shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth_service: AuthService,
                private m_user_service: UserService) { }

    //**********
    // Getters *
    //**********
    private get authService() { return  this.m_auth_service; }
    private get userService() { return  this.m_user_service; }


    canActivate(): Observable<boolean> {
        return this.authService.appUser$
            .pipe(map(app_user => app_user.isAdmin));

        //return this.authService.user$
        //    .pipe( switchMap(user => this.userService.get(user.uid).valueChanges()))
        //    .pipe( map(app_user => app_user.isAdmin));
    }
}
