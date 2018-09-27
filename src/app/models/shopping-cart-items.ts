import {Product} from './product';

export class ShoppingCartItem {

    //*****************
    // Class Members **
    //*****************
    private m_key: string;
    private m_title: string;
    private m_image_url: string;
    private m_price: number;
    private m_quantity: number;

    //***************
    // Constructor **
    //***************
    constructor(key: string) {
        this.m_key = key;
    }

    //***********
    // Getters **
    //***********
    get key() { return this.m_key; }
    get title() { return this.m_title; }
    get imageUrl() { return this.m_image_url; }
    get price() { return this.m_price; }
    get quantity() { return this.m_quantity; }

    //***********
    // Setters **
    //***********
    set key(value) { this.m_key = value; }
    set title(value) { this.m_title = value; }
    set imageUrl(value) { this.m_image_url = value; }
    set price(value) { this.m_price = value; }
    set quantity(value) { this.m_quantity = value; }


    get totalPrice() { return this.price * this.quantity; }

}