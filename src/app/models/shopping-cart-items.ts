import {Product} from './product';

export class ShoppingCartItem {

    //*****************
    // Class Members **
    //*****************
    private m_product: Product;
    private m_quantity: number;

    //***************
    // Constructor **
    //***************
    constructor(product: Product, quantity) {
        this.m_product = product;
        this.m_quantity = quantity;
    }

    //***********
    // Getters **
    //***********
    get product() { return this.m_product; }
    get quantity() { return this.m_quantity; }
    get totalPrice() { return this.product.price * this.quantity; }

}