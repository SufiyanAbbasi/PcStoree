import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { ComputerComponent } from './components/computer/computer.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';
import { TempdrivenComponent } from './components/tempdriven/tempdriven.component';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'laptop', component:LaptopComponent},
    {path:'computer', component:ComputerComponent},
    {path:'mobile', component:MobileComponent},
    {path:'cart', component:CartComponent},
    {path:'', component:TempdrivenComponent},
    {path:'signup', component:ReactiveformComponent},
    { path: 'details/:type/:id', component: ItemdetailsComponent },
    
];
