import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tempdriven',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './tempdriven.component.html',
  styleUrl: './tempdriven.component.css'
})
export class TempdrivenComponent {
  isFormSubmited : boolean = false;

  userObj: any = {
    firstName: '',
    userName: '',
    password: ''
  }

  onSubmit(form : NgForm){
    debugger;
    this.isFormSubmited = true;
  }
}
