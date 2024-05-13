import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../services/navbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent {

  userForm : FormGroup;
  errorMessage: string = '';
  //same procedure using in constructor
  // userForm : FormGroup = new FormGroup({
  //   firstName : new FormControl(''),
  //   email : new FormControl(''),
  //   password : new FormControl(''),
  // })

  constructor(private uiService: UiService, private authService: AuthService, private router:Router){
    this.userForm = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(3)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
      isAgree: new FormControl(false)
    })
  }
  ngOnInit(){
    this.uiService.setShowNavbar(false);

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.signup(this.userForm.value).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Signup successful', response);
          // Optionally, redirect to another page
          this.router.navigate(['/'])
        },
        error: (error) => {
          // Handle signup error
          console.error('Signup error', error);
          this.errorMessage = 'Signup failed. Please try again.'; // Display error message to user
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.uiService.setShowNavbar(true);
  }
}
