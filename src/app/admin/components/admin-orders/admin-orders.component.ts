import {Component, OnInit} from '@angular/core';
import {OrderService} from 'shared/services/order.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

    //*****************
    // Class Members **
    //*****************
    private m_order$: Observable<any>;

    //***************
    // Constructor **
    //***************
    constructor(private m_order_service: OrderService) { }

    //***********
    // Getters **
    //***********
    private get order$() { return this.m_order$; }
    private get orderService() { return this.m_order_service; }

    //***********
    // Setters **
    //***********
    private set order$(value) { this.m_order$ = value; }


    ngOnInit() {
        this.order$ = this.orderService.getOrders();
    }

}
