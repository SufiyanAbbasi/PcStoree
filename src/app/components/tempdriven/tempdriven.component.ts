import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-tempdriven',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './tempdriven.component.html',
  styleUrl: './tempdriven.component.css'
})
export class TempdrivenComponent {
  isFormSubmitted: boolean = false;
  errorMessage: string = '';
  constructor(private uiService: UiService, private authService: AuthService, private router: Router, private cartService:CartService) { }

  onSubmit(form: NgForm): void {
    this.isFormSubmitted = true;
    if (form.valid) { 
      this.authService.login(form.value).subscribe({
        next: (response) => {
          if (response) {
            let username = response.name;
            localStorage.setItem('username', username);
            this.router.navigate(['/home']);
          }
          console.log('Login successful', response);
          alert('Login Succesfully!')
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'Invalid email or password'; 
        }
      });

    }
    if (!form.valid) {
      alert('Wrong Credentials')
    }
  }

  userObj: any = {
    firstName: '',
    userName: '',
    password: ''
  }


  ngOnInit(): void {
    this.uiService.setShowNavbar(false);
  }

  ngOnDestroy(): void {
    this.uiService.setShowNavbar(true);
  }

}
