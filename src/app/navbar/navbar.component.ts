import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  customer: Customer | null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getCustomer().subscribe(customer => {
      this.customer = customer;
    });
  }
}
