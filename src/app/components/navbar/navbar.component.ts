import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../interface/item';
import { ItemService } from '../../services/item-data.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { UiService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  // userProfileImage: string | null = null;
  showNavbar: boolean = true;

  searchTerm: string = '';
  cartItemCount$!: Observable<number>;
  showSearchBox: boolean = true;
  showProfileBox = false;
  username: string = '';

  constructor(private cartService: CartService, private searchService: SearchService, private router: Router, private uiService: UiService, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearchBox = !['/', '/cart', '/home', '/signup'].includes(event.url);
      }
    });

    this.cartItemCount$ = this.cartService.getCartItemCount().asObservable();

 
    //new changes
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername && storedUserId) {
      this.username = storedUsername;
      const userId = parseInt(storedUserId, 10);
    

    // this.cartService.getCartItems(userId).subscribe(cartItems => {
    //   // Store the cart items in a service or state management
    //   console.log(cartItems);
    //   // Update cart item count or other related UI updates here
    // });
  }
    // Subscribe to changes in the authenticated user
    this.loggedInUser();


    this.getCartCount();
    console.log('testing');

  }

  loggedInUser(){
    this.authService.loggedInUser.subscribe(user => {
      if (user) {
        this.username = user.name; // Update the username
      } else {
        this.username = '';
      }
    });
  }

  getCartCount() {
    this.cartService.getCartItemCount().subscribe(count => {
      console.log('Cart item count:', count); // Log the count to verify
      // this.cartItemCount$ = count;

      this.uiService.showNavbar.subscribe(visible => {
        this.showNavbar = visible;
      });
    });
  }

  onSearchTermChange(event: any) {
    const term = (event.target as HTMLInputElement)?.value.toLowerCase(); // Normalize to lowercase
    this.searchService.setSearchTerm(term); // Update SearchService
  }

  navigateToSearch() { // Optional: Navigate to dedicated search page
    this.searchService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/search']); // Replace with your search route
  }

  isHomeComponent(): boolean {
    return this.router.url === '/home';
  }

  isCartComponent(): boolean {
    return this.router.url === '/cart';
  }
  isReactiveFormComponent(): boolean {
    return this.router.url === '/signup';
  }
  isTempdrivenComponent(): boolean {
    return this.router.url === '/';
  }


  toggleProfileBox(): void {
    this.showProfileBox = !this.showProfileBox;
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    console.log("user Logged out");

    // Clear username from local storage on logout
    localStorage.removeItem('username');
    this.username = '';

    this.router.navigate(['/']); // Navigate to the login page after logout
  }

}
