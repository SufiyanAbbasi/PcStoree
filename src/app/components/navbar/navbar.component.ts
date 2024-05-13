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
  cartItemCount: number = 0;
  showSearchBox: boolean = true;
  showProfileBox = false;
  username: string = '';

  constructor(private cartService: CartService, private searchService: SearchService, private router: Router, private uiService: UiService, private authService: AuthService) { }

  ngOnInit() {
    // store name permanently
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }   
    
    this.cartService.getCartItemCount().subscribe(count => {
      console.log('Cart item count:', count); // Log the count to verify
      this.cartItemCount = count;

      this.uiService.showNavbar.subscribe(visible => {
        this.showNavbar = visible;
      });


      //for username
      // this.authService.loggedInUser.subscribe(user => {
      //   if (user) {
      //     this.username = user.name; // Assuming 'name' is the property holding the username
      //   } else {
      //     this.username = '';
      //   }
      // });
      this.authService.loggedInUser.subscribe(user => {
        if (user) {
          this.username = user.name; // Assuming 'name' is the property holding the username
    
          // Update local storage with the latest username
          localStorage.setItem('username', this.username);
        } else {
          this.username = '';
          localStorage.removeItem('username'); // Clear username if user logs out
        }
      });


    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearchBox = !['/', '/cart', '/home', '/signup'].includes(event.url);
      }
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

  // logout(): void {
  //   this.authService.logout(); // Call the logout method from AuthService
  //   console.log("user Logged out");

  //   this.router.navigate(['/']); // Navigate to the login page after logout
  // }
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    console.log("user Logged out");

    // Clear username from local storage on logout
    localStorage.removeItem('username');
    this.username = '';

    this.router.navigate(['/']); // Navigate to the login page after logout
  }

}
