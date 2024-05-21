import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { ComputerComponent } from './components/computer/computer.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';
import { TempdrivenComponent } from './components/tempdriven/tempdriven.component';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent, canActivate: [AuthGuard] , title: 'Home Page'},
    {path:'laptop', component:LaptopComponent, canActivate: [AuthGuard], title: 'Laptop' },
    {path:'computer', component:ComputerComponent, canActivate: [AuthGuard], title: 'Desktop' },
    {path:'mobile', component:MobileComponent, canActivate: [AuthGuard], title: 'Mobile' },
    {path:'cart', component:CartComponent, canActivate: [AuthGuard], title: 'Cart' },
    {path:'myprofile', component:MyProfileComponent, canActivate: [AuthGuard], title: 'My Profile' },
    {path:'', component:TempdrivenComponent, title: 'Login' },
    {path:'signup', component:ReactiveformComponent, title: 'Sign Up' },
    { path: 'details/:type/:id', component: ItemdetailsComponent,canActivate: [AuthGuard], title: 'Details'  },
    { path: '**', component: NotfoundComponent, title: 'Not Found' } 
    
];
