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
    {path:'home', component:HomeComponent, canActivate: [AuthGuard] },
    {path:'laptop', component:LaptopComponent, canActivate: [AuthGuard] },
    {path:'computer', component:ComputerComponent, canActivate: [AuthGuard] },
    {path:'mobile', component:MobileComponent, canActivate: [AuthGuard] },
    {path:'cart', component:CartComponent, canActivate: [AuthGuard] },
    {path:'myprofile', component:MyProfileComponent, canActivate: [AuthGuard] },
    {path:'', component:TempdrivenComponent },
    {path:'signup', component:ReactiveformComponent, },
    { path: 'details/:type/:id', component: ItemdetailsComponent,canActivate: [AuthGuard]  },
    { path: '**', component: NotfoundComponent } 
    
];
