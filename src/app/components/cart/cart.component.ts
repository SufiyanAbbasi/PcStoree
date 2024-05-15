import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Item } from '../../interface/item';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];

  constructor(private cartService: CartService, private authService:AuthService) { }

  ngOnInit(): void {
    // this.cartItems = this.cartService.getCartItems();
    this.loadCartItems();
  }

  loadCartItems(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.loadCartFromLocalStorage(); // Load the cart for the specific user
      this.cartItems = this.cartService.getCartItems();
    } else {
      console.error('User is not logged in.');
    }
  }


  deleteItem(item: Item): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(item: Item): void {
    if (item.quantity < 5) {
      this.cartService.addToCart(item); // Call addToCart to increase quantity
      this.cartItems = this.cartService.getCartItems(); // Update cartItems
    }else{
      alert("you can add only 5")
    }
  }
 
  decreaseQuantity(item: Item): void {
    if (item.quantity > 1) {
      item.quantity--; // Decrease quantity locally
      this.cartService.updateCart(this.cartItems); // Update cart in service
      this.cartService.saveCartToLocalStorage(); // Save updated cart to localStorage
    }
  }
}