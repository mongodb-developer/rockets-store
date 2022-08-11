import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  customer: Customer | null;
  cart$: Observable<Cart>;

  constructor(private auth: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.auth.getCustomer().subscribe(customer => {
      this.customer = customer;
      this.cart$ = this.cartService.getCartObservable(customer);
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }
}