import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../interface/item';
import { ItemService } from '../../services/item-data.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchTerm: string = ''; 
  cartItemCount: number = 0;
  showSearchBox: boolean = true;
  constructor(private cartService: CartService, private searchService:SearchService, private router: Router) { }
  
  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      console.log('Cart item count:', count); // Log the count to verify
      this.cartItemCount = count;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearchBox = !['/', '/cart'].includes(event.url);
      }
    });
  }

  onSearchTermChange(event: any) {
    const term = (event.target as HTMLInputElement)?.value.toLowerCase(); // Normalize to lowercase
    this.searchService.setSearchTerm(term); // Update SearchService
  }

  // onSearchTermChange(term: string) {
  //   this.searchTerm = term.toLowerCase();
  //   this.searchService.setSearchTerm(this.searchTerm); // Update SearchService
  // }
  navigateToSearch() { // Optional: Navigate to dedicated search page
    this.searchService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/search']); // Replace with your search route
  }

  isHomeComponent(): boolean {
    return this.router.url === '/';
  }

  isCartComponent(): boolean {
    return this.router.url === '/cart';
  }
}
