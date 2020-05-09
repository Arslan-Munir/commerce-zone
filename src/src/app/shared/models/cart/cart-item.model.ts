
export class CartItem{

    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    get totalPrice() {
        return this.price * this.quantity;
    }

    constructor(init?: Partial<CartItem>) {
        Object.assign(this, init);
    }
}
