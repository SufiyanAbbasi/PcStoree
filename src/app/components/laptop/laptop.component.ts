import { CommonModule, UpperCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Item } from '../../interface/item';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { config } from '../../../config/config.dev';

@Component({
  selector: 'app-laptop',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, UpperCasePipe],
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

  ngOnInit() {
    //fetch data from backend
    this.http.get<Item[]>(`${config.apiUrl}api/Products?category=laptop`).subscribe(data => {
      this.filteredItems = data;  
    })
    
    this.searchterm();
  }

  searchterm(){
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

  addItemToCart(item: Item) {
    alert("item Added to cart ")
    this.cartService.addToCart(item);
    console.log('Add item to cart:', item);
  }

}
