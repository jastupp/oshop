import {ShoppingCartItem} from './shopping-cart-items';
import {Product} from './product';

export class ShoppingCart {

    //****************
    // Class Members *
    //****************
    private m_item_map: ShoppingCartItem[] = [];
    private m_items: ShoppingCartItem[] = [];

    //**************
    // Constructor *
    //**************
    constructor(items_map: ShoppingCartItem[]) {
        this.m_item_map = items_map;
        for(const id of Object.keys(this.itemMap)) {
            const item = this.itemMap[id];
            this.items.push(new ShoppingCartItem({ ...item, key: id }));
        }
    }

    //**********
    // Getters *
    //**********
    private get itemMap() { return this.m_item_map; }
    get items() { return this.m_items; }
    get totalItems() { return this.total('quantity'); }
    get totalPrice() { return this.total('totalPrice'); }


    getQuantity(product: Product) {
        const item = this.itemMap[product.key];
        return item ? item.quantity : 0;
    }

    private total(property: string) {
        let result = 0;
        this.items.forEach(next => {
            result += next[property];
        });
        return result;
    }
}
