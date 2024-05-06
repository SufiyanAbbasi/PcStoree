import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { LaptopComponent } from "../laptop/laptop.component";
import { ComputerComponent } from "../computer/computer.component";
import { MobileComponent } from "../mobile/mobile.component";
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, HttpClientModule, LaptopComponent, ComputerComponent, MobileComponent, FooterComponent]
})
export class HomeComponent {
    constructor(private router: Router) {}

    navigateTo(route: string) {
      this.router.navigate([route]);
    }
    
}
