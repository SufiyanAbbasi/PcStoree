import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Item } from '../../interface/item';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-laptop',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './laptop.component.html',
  styleUrl: './laptop.component.css'
})
export class LaptopComponent {
  

  constructor(
    private router: Router,
    private cartService: CartService,
    private searchService: SearchService,
    private http:HttpClient,
    private authService:AuthService
  ) {}

  filteredItems: Item[] = [];
  private searchTermSubscription: Subscription | undefined;

  // items: Item[] = [
  //   {
  //     id: 1,
  //     name: 'Laptop - 1',
  //     imageUrl: '../../../assets/images/lap1.avif',
  //     description: 'Dell Laptop',
  //     price: 300.99,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Laptop - 2',
  //     imageUrl: '../../../assets/images/lap2.avif',
  //     description: 'HP Laptop',
  //     price: 400.99,
  //     quantity: 1,

  //   },
  //   {
  //     id: 3,
  //     name: 'Laptop - 3',
  //     imageUrl: '../../../assets/images/lap3.avif',
  //     description: 'Lenovo Laptop',
  //     price: 230.99,
  //     quantity: 1,

  //   },
  //   {
  //     id: 4,
  //     name: 'Laptop - 4',
  //     imageUrl: '../../../assets/images/lap4.avif',
  //     description: 'Macbook',
  //     price: 500.99,
  //     quantity: 1,

  //   },
  //   {
  //     id: 5,
  //     name: 'Laptop - 5',
  //     imageUrl: '../../../assets/images/lap5.avif',
  //     description: 'Macbook Pro',
  //     price: 550.99,
  //     quantity: 1,

  //   },
  //   {
  //     id: 6,
  //     name: 'Laptop - 6',
  //     imageUrl: '../../../assets/images/lap6.avif',
  //     description: 'Acer',
  //     price: 400.99,
  //     quantity: 1,

  //   },
  //   // Add more items here...
  // ];

  ngOnInit() {
    //fetch data from backend
    this.http.get<Item[]>('https://localhost:7250/api/Products?category=laptop').subscribe(data => {
      this.filteredItems = data;
  
    })

  
    //  this is necessary comment only for some time--------------------------------------
    // Fetch initial items (optional)
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.filteredItems = this.filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    });
  }

  ngOnDestroy() {
    this.searchTermSubscription?.unsubscribe();
  }

  viewItem(item: Item) {
    console.log('View item:', item);
    this.router.navigate(['/details', 'laptops', item.id]).catch(error => {
      console.error('Navigation error:', error);
      // Optionally display an error message to the user
    });
  }

  // viewItem(item: Item) {
  //   // alert("item viewed ")
  //   console.log('View item:', item);
  //   this.router.navigate(['/details', 'laptops', item.id]);

  // }

  addItemToCart(item: Item) {
    alert("item Added to cart ")
    this.cartService.addToCart(item);
    console.log('Add item to cart:', item);
  }

  // addItemToCart(item: Item) {
  //   const userId = this.authService.getUserId(); // Get the user ID from the AuthService
  //   if (userId === null) {
  //     console.error('User is not logged in.');
  //     return;
  //   }
  
  //   const cartItem = {
  //     userId: userId, // Assign the user ID
  //     productId: item.id, // Assign the product ID
  //     quantity: 1 // Set the quantity to 1 or the desired amount
  //   };
  
  //   this.cartService.addToCart(cartItem).subscribe({
  //     next: (response) => {
  //       console.log('Item successfully added to cart', response);
  //     },
  //     error: (error) => {
  //       console.error('Failed to add item to cart', error);
  //       console.error('Error details:', error.error); // Log the detailed error
  //     }
  //   });
  // }
  


  // trackByFn(index: number, item: Item): number {
  //   return item.id; // Use a unique identifier from your item object
  // }
  
}
