import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable, Subject, tap } from 'rxjs';
import { Cart } from './cart';
import { Customer } from './customer';
import { Rocket } from './rocket';

const GET_CART = gql`
  query ($customerId: ObjectId) {
    cart(query:{ customer: { _id: $customerId } }) {
      _id
      customer {
        _id
        name
      }
      items {
        _id
        name
        price
      }
    }
  }
`;

const CREATE_CART = gql`
  mutation ($cart: CartInsertInput!) {
    insertOneCart(data: $cart) {
      _id
      customer {
        _id
        name
      }
      items {
        _id
        name
        price
      }
    }
  }
`;

const UPDATE_CART_ITEMS = gql`
  mutation ($id: ObjectId, $items: [CartItemUpdateInput]) {
    updateOneCart(query: { _id: $id }, set: { items: $items }) {
      _id
      customer {
        _id
        name
      }
      items {
        _id
        name
        price
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: Cart;
  private _cart$: Subject<Cart>;

  constructor(private apollo: Apollo) {
    this._cart$ = new Subject();
  }

  private get cart() {
    return this._cart;
  }
  
  private set cart(c: Cart) {
    this._cart = c;
    this._cart$.next(c);
  }

  getCartObservable(customer: Customer) {
    if (!this._cart) {
      this.initCart(customer);
    }

    return this._cart$;
  }

  private initCart(customer: Customer): void {
    const cart = new Cart(customer);

    this.apollo.query({
      query: GET_CART,
      variables: { customerId: customer._id }
    }).subscribe((result: any) => {
      if (result?.data?.cart) {
        this.cart = result?.data?.cart;
      } else {
        this.apollo.mutate({
          mutation: CREATE_CART,
          variables: { cart }
        })
        .pipe(
          tap((result: any) => {
            this.cart = result?.data?.insertOneCart;
          })
        ).subscribe();
      }
    });
  }

  addToCart(item: Rocket): Observable<any> {
    const items = this.cart.items.map(i => ({
      _id: i._id,
      name: i.name,
      price: i.price
    }));
    items.push({
      _id: item._id,
      name: item.name,
      price: item.price,
    });

    return this.apollo.mutate({
      mutation: UPDATE_CART_ITEMS,
      variables: { _id: this.cart._id, items }
    })
    .pipe(
      tap((result: any) => {
        this.cart = result?.data?.updateOneCart;
      })
    );
  }

  clearCart() {
    return this.apollo.mutate({
      mutation: UPDATE_CART_ITEMS,
      variables: { _id: this.cart._id, items: []}
    })
    .pipe(
      tap((result: any) => {
        this.cart = result?.data?.updateOneCart;
      })
    );
  }
}
