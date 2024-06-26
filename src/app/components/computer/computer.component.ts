import { Component } from '@angular/core';
import { Item } from '../../interface/item';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  // desktopitems: Item[] = [
  //   {
  //     id: 7,
  //     name: 'Desktop - 1',
  //     imageUrl: '../../../assets/images/des1.avif',
  //     description: 'Dell',
  //     price: 300.99,
  //     quantity:1

  //   },
  //   {
  //     id: 8,
  //     name: 'Desktop - 2',
  //     imageUrl: '../../../assets/images/des2.avif',
  //     description: 'HP',
  //     price: 400.99,
  //     quantity:1

  //   },
  //   {
  //     id: 9,
  //     name: 'Desktop - 3',
  //     imageUrl: '../../../assets/images/des3.avif',
  //     description: 'Lenovo',
  //     price: 230.99,
  //     quantity:1

  //   },
  //   {
  //     id: 10,
  //     name: 'Desktop - 4',
  //     imageUrl: '../../../assets/images/des4.avif',
  //     description: 'Pentium',
  //     price: 500.99,
  //     quantity:1

  //   },
  //   {
  //     id: 11,
  //     name: 'Desktop - 5',
  //     imageUrl: '../../../assets/images/des5.avif',
  //     description: 'Core',
  //     price: 550.99,
  //     quantity:1

  //   },
  //   {
  //     id: 12,
  //     name: 'Desktop - 6',
  //     imageUrl: '../../../assets/images/des6.avif',
  //     description: 'Acer',
  //     price: 400.99,
  //     quantity:1

  //   },
  //   // Add more items here...
  // ]
  ngOnInit(): void {
    this.http.get<Item[]>('https://localhost:7250/api/Products?category=computer').subscribe(data => {
      this.filteredItems = data;
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
