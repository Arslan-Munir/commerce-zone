import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user.model';
import { ShoppingCart } from 'shared/models/cart/shopping-cart.model';
import { GoogleAuthService } from 'shared/services/auth/google/google-auth.service';
import { CartService } from 'shared/services/cart/cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser: AppUser;
  cartItems: number;
  totalCartItems: number;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: GoogleAuthService, public cartService: CartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logOut() {
    this.auth.logOut();
  }
}
