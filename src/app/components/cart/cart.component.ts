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
    this.cartItems = this.cartService.getCartItems();
    // this.loadCartItems();
  }

// loadCartItems(): void {
//   const userId = this.authService.getUserId();
//   if (userId !== null) {
//     this.cartService.getCartItems(userId).subscribe({
//       next: (items) => this.cartItems = items,
//       error: (error) => console.error('Error fetching cart items:', error)
//     });
//   } else {
//     console.error('User is not logged in.');
//   }
// }
  deleteItem(item: Item): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      if (item.quantity > 1) {
        item.quantity--; // Decrease quantity if greater than one
      } else {
        this.cartItems.splice(index, 1); // Remove the item if quantity is one
      }
      // Optionally, you may want to update total price or perform any other actions
    }
  }

  increaseQuantity(item: Item): void {
    if (item.quantity < 5) {
      this.cartService.addToCart(item); // Call addToCart to increase quantity
      this.cartItems = this.cartService.getCartItems(); // Update cartItems
    }else{
      alert("you can add only 5")
    }
  }
  // increaseQuantity(item: Item): void {
  //   if (item.quantity < 5) {
  //     item.quantity++;
  //     this.cartService.updateCartItem(item).subscribe(); // Assuming updateCartItem adjusts quantity in the backend
  //   } else {
  //     alert("You can add only 5");
  //   }
  // }

  decreaseQuantity(item: Item): void {
    if (item.quantity > 1) {
      item.quantity--; // Decrease quantity locally
      this.cartService.updateCart(this.cartItems); // Update cart in service
    }
  }
}