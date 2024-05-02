import { Injectable } from '@angular/core';
import { Item } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Item[] = [];

  constructor() { }

  addToCart(item: Item): void {
    const itemExists = this.cart.find(cartItem => cartItem.id === item.id);
    if (!itemExists) {
      // If item does not exist in cart, add it with quantity 1
      const newItem: Item = { ...item, quantity: 1 };
      this.cart.push(newItem);
      console.log('Added to cart:', newItem);
    } else {
      // If item already exists in cart, increment its quantity by 1
      itemExists.quantity++;
      console.log('Increased quantity of item:', itemExists);
    }
  }

  removeFromCart(item: Item): void {
    const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      console.log('Removed from cart:', item);
    } else {
      console.log('Item not found in cart');
    }
  }

  getCartItems(): Item[] {
    return this.cart;
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
