import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../interface/item';
import {  ItemService } from '../../services/item-data.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-itemdetails',
  standalone: true,
  imports: [CommonModule],
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
      const itemId = +params['id'];
      if (this.type) {
        this.item = this.itemService.getItemById(this.type, itemId);
      }
    });
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item); // Call the addToCart method from the CartService
    // alert('Item added to cart successfully!');
  }
}

