import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../shared/models/order';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';
import {OrderService} from '../shared/services/order.service';
import {Router} from '@angular/router';
import {ShoppingCart} from '../shared/models/shopping-cart';

@Component({
    selector: 'app-shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

    //*****************
    // Class Members **
    //*****************
    private m_shipping = {};
    private m_uid: string;
    private m_user_subscription: Subscription;
    private m_cart: ShoppingCart;

    //***************
    // Constructor **
    //***************
    constructor(private m_router: Router,
                private m_auth_service: AuthService,
                private m_order_service: OrderService) { }

    //***********
    // Getters **
    //***********
    private get userSubscription() { return this.m_user_subscription; }
    private get uid() { return this.m_uid; }
    private get authService() { return this.m_auth_service; }
    private get orderService() { return this.m_order_service; }
    private get router() { return this.m_router; }
    get shipping() { return this.m_shipping; }
    get cart() { return this.m_cart; }

    //***********
    // Setters **
    //***********
    private set userSubscription(value) { this.m_user_subscription = value; }
    private set uid(value) { this.m_uid = value; }
    @Input('cart') set cart(value) { this.m_cart = value; }

    ngOnInit() {
        this.userSubscription = this.authService.user$.subscribe(user => this.uid = user.uid );
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    async placeOrder() {
        const order = new Order(this.uid, this.shipping, this.cart);
        const result = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success', result.key]);
    }
}
