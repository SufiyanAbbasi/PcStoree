import { Injectable } from '@angular/core';
import { Item } from '../interface/item';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Item[] = [];
  public cartItemCount = new BehaviorSubject<number>(0);
  // private baseUrl = 'https://localhost:7250/api/CartItems';
  constructor(private router: Router, private http: HttpClient) { }


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
  


  // addToCart(cartItem: { userId: number, productId: number, quantity: number }): Observable<any> {
  //   return this.http.post(this.baseUrl, cartItem);
  // }
  

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


  // deleteCartItem(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }

  getCartItems(): Item[] {
    return this.cart;
  }
  // Method to get cart items for a specific user
  // getCartItems(userId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?userId=${userId}`);
  // }



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
  // updateCartItem(cartItem: Item): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${cartItem.id}`, cartItem);
  // }
}
