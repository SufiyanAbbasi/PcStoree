import { Injectable } from '@angular/core';
import { Item } from '../interface/item';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Item[] = [];
  public cartItemCount = new BehaviorSubject<number>(0);
  constructor(private router: Router) { }


  addToCart(item: Item): void {
    const itemExists = this.cart.find(cartItem => cartItem.id === item.id);
    if (!itemExists) {
      const newItem: Item = { ...item, quantity: 1 };
      this.cart.push(newItem);
    } else {
      itemExists.quantity++;
    }
    this.cartItemCount.next(this.cartItemCount.value + 1); // Update cart item count
    this.router.navigate(['/cart']);
  }
  
  removeFromCart(item: Item): void {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      // Decrement cart item count before emitting update
      this.cartItemCount.next(this.cartItemCount.value - 1);
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
    console.log('Cart cleared');
  }

  updateCart(cartItems: Item[]): void {
    this.cart = [...cartItems];
    console.log('Cart updated:', this.cart);
  }
}
