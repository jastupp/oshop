import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    //**************
    // Constructor *
    //**************
    constructor(private m_auth: AuthService,
                private m_router: Router,
                private m_user_service: UserService) {}

    //**********
    // Getters *
    //**********
    private get auth() { return this.m_auth; }
    private get router() { return this.m_router; }
    private get userService() { return this.m_user_service; }

    ngOnInit(): void {
        this.auth.user$.subscribe(user => {
            if(user) {
                this.userService.save(user);
                const return_url = localStorage.getItem('returnUrl');
                if(return_url) {
                    localStorage.removeItem('returnUrl');
                    this.router.navigateByUrl(return_url);
                }
            }
        });
    }
}
