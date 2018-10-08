import {ShoppingCart} from './shopping-cart';

export class Order {

    //*****************
    // Class Members **
    //*****************
    private m_date_placed: number;
    private m_items: any[];

    //***************
    // Constructor **
    //***************
    constructor(private m_user_id: string,
                private m_shipping: any,
                shopping_cart: ShoppingCart) {

        this.datePlaced = new Date().getTime();

        this.items = shopping_cart.items.map(next => {
            return {
                product: {
                    title: next.title,
                    imageUrl: next.imageUrl,
                    price: next.price,
                },
                quantity: next.quantity,
                totalPrice: next.totalPrice
            };
        });
    }

    //***********
    // Getters **
    //***********
    get datePlaced() { return this.m_date_placed; }
    get shipping() { return this.m_shipping; }

    //***********
    // Setters **
    //***********
    set datePlaced(value) { this.m_date_placed = value; }
    private set items(value) { this.m_items = value; }
}
