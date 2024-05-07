import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent {

  userForm : FormGroup;
  //same procedure using in constructor
  // userForm : FormGroup = new FormGroup({
  //   firstName : new FormControl(''),
  //   email : new FormControl(''),
  //   password : new FormControl(''),
  // })

  constructor(){
    this.userForm = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(3)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)]),
      isAgree: new FormControl(false)
    })
  }

}
