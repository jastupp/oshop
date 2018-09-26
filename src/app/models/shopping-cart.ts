import {ShoppingCartItem} from './shopping-cart-items';

export class ShoppingCart {

    //****************
    // Class Members *
    //****************
    private m_item_map: ShoppingCartItem[];
    private m_items: ShoppingCartItem[] = [];

    //**************
    // Constructor *
    //**************
    constructor(items_map: ShoppingCartItem[]) {
        this.m_item_map = items_map;
        for(const id of Object.keys(this.itemMap)) {
            const item = this.itemMap[id];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    //**********
    // Getters *
    //**********
    get itemMap() { return this.m_item_map; }
    get items() { console.log('Items: ', this.m_items); return this.m_items; }

    get totalItems() {
        return this.total('quantity');
    }

    get totalPrice() {
        return this.total('totalPrice');
    }

    private total(property: string) {
        let result = 0;
        this.items.forEach(next => {
            result += next[property];
        });
        return result;
    }
}
