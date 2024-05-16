import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../interface/item';
import {  ItemService } from '../../services/item-data.service';
import { CartService } from '../../services/cart.service';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-itemdetails',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './itemdetails.component.html',
  styleUrl: './itemdetails.component.css'
})
export class ItemdetailsComponent {
  item: Item | undefined;
  type: string | null = null;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      const itemId = Number(params['id']); // Ensure this is a number
  
      if (this.type && itemId) {
        this.itemService.getItemById(this.type, itemId)
          .subscribe({
            next: (data) => {
              this.item = data;
              debugger
              console.log(data);
              
            },
            error: (error) => {
              console.error('Error retrieving item:', error);
              if (error.status === 404) {
                // Item not found, handle gracefully
                this.item = undefined; // Set item to undefined to avoid rendering issues
                alert('Item with ID ' + itemId + ' not found in category ' + this.type);
              }
            }
          });
      }
    });
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item); // Call the addToCart method from the CartService
    alert('Item added to cart successfully!');
  }
}

