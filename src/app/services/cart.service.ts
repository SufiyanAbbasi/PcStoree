import { Injectable } from '@angular/core';
import { Item } from '../interface/item';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Item[] = [];
  public cartItemCount = new BehaviorSubject<number>(0);
  private storageKeyPrefix = 'cartItems_';
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.loadCartFromLocalStorage();
   }

   private getStorageKey(): string {
    const userId = this.authService.getUserId();
    return userId ? `${this.storageKeyPrefix}${userId}` : `${this.storageKeyPrefix}guest`;
  }

  public saveCartToLocalStorage(): void {
    const storageKey = this.getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(this.cart));
  }

  public loadCartFromLocalStorage(): void {
    const storageKey = this.getStorageKey();
    const storedCart = localStorage.getItem(storageKey);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartItemCount.next(this.cart.reduce((count, item) => count + item.quantity, 0));
    }
  }

  addToCart(item: Item): void {
    const itemExists = this.cart.find(cartItem => cartItem.id === item.id);
    if (!itemExists) {
      const newItem: Item = { ...item, quantity: 1 };
      this.cart.push(newItem);
    } else {
      itemExists.quantity++;
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.saveCartToLocalStorage();
    this.router.navigate(['/cart']);
  }



  removeFromCart(item: Item): void {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartItemCount.next(this.cartItemCount.value - 1);
      this.saveCartToLocalStorage();
      console.log('Removed from cart:', item);
    } else {
      console.log('Item not found in cart');
    }
  }


  getCartItems(): Item[] {
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  clearCart(): void {
    this.cart = [];
    this.cartItemCount.next(0);
    const storageKey = this.getStorageKey();
    localStorage.removeItem(storageKey);
    console.log('Cart cleared');
  }

  updateCart(cartItems: Item[]): void {
    this.cart = [...cartItems];
    this.cartItemCount.next(this.cart.reduce((count, item) => count + item.quantity, 0));
    this.saveCartToLocalStorage();
    console.log('Cart updated:', this.cart);
  }

}
