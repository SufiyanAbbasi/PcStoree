import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tempdriven',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './tempdriven.component.html',
  styleUrl: './tempdriven.component.css'
})
export class TempdrivenComponent {
  isFormSubmitted : boolean = false;
  errorMessage: string = '';
  constructor(private uiService: UiService, private authService: AuthService, private router:Router) { }

  onSubmit(form: NgForm): void {
    this.isFormSubmitted = true;
    if (form.valid) {
      this.authService.login(form.value).subscribe({
        next: (response) => {
          // Handle successful login
          console.log('Login successful', response);
          
          // Optionally, redirect to another page
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // Handle login error
          console.error('Login error', error);
          this.errorMessage = 'Invalid email or password'; // Display error message to user
        }
      });
    }

  }
  userObj: any = {
    firstName: '',
    userName: '',
    password: ''
  }

  // onSubmit(form : NgForm){
  //   debugger;
  //   this.isFormSubmited = true;
  // }




// In your login/signup component for hide navbar

ngOnInit(): void {
  this.uiService.setShowNavbar(false);
}

ngOnDestroy(): void {
  this.uiService.setShowNavbar(true);
}

}
