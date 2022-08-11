import { Customer } from "./customer";

export class Cart {
    _id: string;
    customer: CartCustomer;
    items: CartItem[];

    constructor(customer: Customer, items: CartItem[] = []) {
        this.customer = new CartCustomer(customer._id, customer.name);
        this.items = items;
    }
}

class CartItem {
    _id: string;
    name: string;
    price: string;
}

class CartCustomer {
    constructor(public _id: string, public name: string) {
    }
}
