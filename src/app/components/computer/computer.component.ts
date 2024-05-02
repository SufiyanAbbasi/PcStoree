import { Component } from '@angular/core';
import { Item } from '../../interface/item';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css'
})
export class ComputerComponent {

  constructor(private router: Router, private cartService:CartService) { }

  desktopitems: Item[] = [
    {
      id: 1,
      name: 'Desktop - 1',
      imageUrl: '../../../assets/images/des1.avif',
      description: 'Dell',
      price: 300.99,
      quantity:1

    },
    {
      id: 2,
      name: 'Desktop - 2',
      imageUrl: '../../../assets/images/des2.avif',
      description: 'HP',
      price: 400.99,
      quantity:1

    },
    {
      id: 3,
      name: 'Desktop - 3',
      imageUrl: '../../../assets/images/des1.avif',
      description: 'Lenovo',
      price: 230.99,
      quantity:1

    },
    {
      id: 4,
      name: 'Desktop - 4',
      imageUrl: '../../../assets/images/des6.avif',
      description: 'Pentium',
      price: 500.99,
      quantity:1

    },
    {
      id: 5,
      name: 'Desktop - 5',
      imageUrl: '../../../assets/images/des5.avif',
      description: 'Core',
      price: 550.99,
      quantity:1

    },
    {
      id: 6,
      name: 'Desktop - 6',
      imageUrl: '../../../assets/images/des6.avif',
      description: 'Acer',
      price: 400.99,
      quantity:1

    },
    // Add more items here...
  ]
  ngOnInit(): void {
  }

  viewItem(item: any) {
    // Implement logic to view item
    this.router.navigate(['/item', item.id]);
    console.log('View item:', item);
  }

  addItemToCart(item: Item) {
    // Implement logic to add item to cart
    alert("item Added to cart ")
    this.cartService.addToCart(item);
    console.log('Add item to cart:', item);
  }
}
