import { Component } from '@angular/core';
import { Item } from '../../interface/item';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent {
  items: Item[] = [];
  constructor(private router: Router, private cartService:CartService) { }
  mobitems: Item[] = [
    {
      id: 1,
      name: 'Mobile - 1',
      imageUrl: '../../../assets/images/mob1.avif',
      description: 'IPhone',
      price: 300.99,
      quantity:1

    },
    {
      id: 2,
      name: 'Mobile - 2',
      imageUrl: '../../../assets/images/mob2.avif',
      description: 'Huawei',
      price: 400.99,
      quantity:1
    },
    {
      id: 3,
      name: 'Mobile - 3',
      imageUrl: '../../../assets/images/mob3.avif',
      description: 'Redmi',
      price: 230.99,
      quantity:1

    },
    {
      id: 4,
      name: 'Mobile - 4',
      imageUrl: '../../../assets/images/mob4.avif',
      description: 'IPhone',
      price: 500.99,
      quantity:1

    },
    {
      id: 5,
      name: 'Mobile - 5',
      imageUrl: '../../../assets/images/mob5.avif',
      description: 'Realme',
      price: 550.99,
      quantity:1

    },
    {
      id: 6,
      name: 'Mobile - 6',
      imageUrl: '../../../assets/images/mob6.avif',
      description: 'Samsung',
      price: 400.99,
      quantity:1

    },
    // Add more items here...
  ];



  viewItem(item: Item) {
    // alert("item viewed ")
    console.log('View item:', item);
    this.router.navigate(['/details', 'mobiles', item.id]);

  }

  addItemToCart(item: Item) {
    // Implement logic to add item to cart
    alert("item Added to cart ")
    this.cartService.addToCart(item);
    console.log('Add item to cart:', item);
  }
}
