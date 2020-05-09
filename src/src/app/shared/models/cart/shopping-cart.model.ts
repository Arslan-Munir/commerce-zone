import { ViewProduct } from '../product/view-product.model';
import { CartItem } from './cart-item.model';

export class ShoppingCart {

    items: CartItem[] = [];
    private itemsMap: { [productId: string]: CartItem };

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line: curly
        for (const productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;
        return count;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: ViewProduct) {
        const item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
    }

     constructor(items) {
         this.itemsMap = items || {};
        // tslint:disable-next-line: forin
         for (const productId in this.itemsMap) {
             const item = this.itemsMap[productId];
             this.items.push(new CartItem({...item, id: productId}));
        }
    }
}
