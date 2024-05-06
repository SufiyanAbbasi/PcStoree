import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "./components/footer/footer.component";
// import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, HomeComponent, HttpClientModule, FooterComponent]
})
export class AppComponent {
  title = 'comlap';
}
