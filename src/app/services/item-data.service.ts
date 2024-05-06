// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Item } from '../interface/item';  // Update the path according to your project structure

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: { [key: string]: Item[] } = {
    laptops: [
      {
        id: 1,
        name: 'Laptop - 1',
        imageUrl: '../../../assets/images/lap1.avif',
        description: 'Dell Laptop',
        price: 300.99,
        quantity: 1,
      },
      {
        id: 2,
        name: 'Laptop - 2',
        imageUrl: '../../../assets/images/lap2.avif',
        description: 'HP Laptop',
        price: 400.99,
        quantity: 1,
      },
      {
        id: 3,
        name: 'Laptop - 3',
        imageUrl: '../../../assets/images/lap3.avif',
        description: 'Lenovo Laptop',
        price: 230.99,
        quantity: 1,
      },
      {
        id: 4,
        name: 'Laptop - 4',
        imageUrl: '../../../assets/images/lap4.avif',
        description: 'Macbook',
        price: 500.99,
        quantity: 1,
      },
      {
        id: 5,
        name: 'Laptop - 5',
        imageUrl: '../../../assets/images/lap5.avif',
        description: 'Macbook Pro',
        price: 550.99,
        quantity: 1,
      },
      {
        id: 6,
        name: 'Laptop - 6',
        imageUrl: '../../../assets/images/lap6.avif',
        description: 'Acer',
        price: 400.99,
        quantity: 1,
      },
    ],
    mobiles: [
      {
        id: 13,
        name: 'Mobile - 1',
        imageUrl: '../../../assets/images/mob1.avif',
        description: 'IPhone',
        price: 300.99,
        quantity: 1
      },
      {
        id: 14,
        name: 'Mobile - 2',
        imageUrl: '../../../assets/images/mob2.avif',
        description: 'Huawei',
        price: 400.99,
        quantity: 1
      },
      {
        id: 15,
        name: 'Mobile - 3',
        imageUrl: '../../../assets/images/mob3.avif',
        description: 'Redmi',
        price: 230.99,
        quantity: 1
      },
      {
        id: 16,
        name: 'Mobile - 4',
        imageUrl: '../../../assets/images/mob4.avif',
        description: 'IPhone',
        price: 500.99,
        quantity: 1
      },
      {
        id: 17,
        name: 'Mobile - 5',
        imageUrl: '../../../assets/images/mob5.avif',
        description: 'Realme',
        price: 550.99,
        quantity: 1
      },
      {
        id: 18,
        name: 'Mobile - 6',
        imageUrl: '../../../assets/images/mob6.avif',
        description: 'Samsung',
        price: 400.99,
        quantity: 1
      },
    ],
    computers: [
      {
        id: 7,
        name: 'Desktop - 1',
        imageUrl: '../../../assets/images/des1.avif',
        description: 'Dell',
        price: 300.99,
        quantity: 1
      },
      {
        id: 8,
        name: 'Desktop - 2',
        imageUrl: '../../../assets/images/des2.avif',
        description: 'HP',
        price: 400.99,
        quantity: 1
      },
      {
        id: 9,
        name: 'Desktop - 3',
        imageUrl: '../../../assets/images/des3.avif',
        description: 'Lenovo',
        price: 230.99,
        quantity: 1
      },
      {
        id: 10,
        name: 'Desktop - 4',
        imageUrl: '../../../assets/images/des4.avif',
        description: 'Pentium',
        price: 500.99,
        quantity: 1
      },
      {
        id: 11,
        name: 'Desktop - 5',
        imageUrl: '../../../assets/images/des5.avif',
        description: 'Core',
        price: 550.99,
        quantity: 1
      },
      {
        id: 12,
        name: 'Desktop - 6',
        imageUrl: '../../../assets/images/des6.avif',
        description: 'Acer',
        price: 400.99,
        quantity: 1
      },
    ]
  };

  constructor() {}

  getItemsByType(type: string): Item[] {
    return this.items[type] || [];
  }

  getItemById(type: string, id: number): Item | undefined {
    return this.items[type].find(item => item.id === id);
  }
}
