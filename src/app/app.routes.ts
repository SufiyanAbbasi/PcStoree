import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { ComputerComponent } from './components/computer/computer.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'laptop', component:LaptopComponent},
    {path:'computer', component:ComputerComponent},
    {path:'mobile', component:MobileComponent},
    {path:'cart', component:CartComponent},
    { path: 'details/:type/:id', component: ItemdetailsComponent },
];
