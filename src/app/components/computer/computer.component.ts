import { Component } from '@angular/core';
import { Item } from '../../interface/item';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/config.dev';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css'
})
export class ComputerComponent {

  constructor(private router: Router, private cartService: CartService, private searchService: SearchService, private http:HttpClient) { }
  filteredItems: Item[] = [];
  private searchTermSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.http.get<Item[]>(`${config.apiUrl}api/Products?category=computer`).subscribe(data => {
      this.filteredItems = data;
    // this.http.get<Item[]>('https://localhost:7250/api/Products?category=computer').subscribe(data => {
    //   this.filteredItems = data;
    })


    this.searchTermSubscription = this.searchService.searchTerm$.subscribe(
      term => {
        this.filteredItems = this.filteredItems.filter(
          item => item.name.toLowerCase().includes(term)
        );
      }
    );
  }

 


  ngOnDestroy() {
    this.searchTermSubscription?.unsubscribe();
  }
  viewItem(item: Item) {
    // alert("item viewed ")
    console.log('View item:', item);
    this.router.navigate(['/details', 'computers', item.id]);

  }


  addItemToCart(item: Item) {
    // Implement logic to add item to cart
    alert("item Added to cart ")
    this.cartService.addToCart(item);
    console.log('Add item to cart:', item);
  }
}
