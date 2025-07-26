import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
    // Define your application routes here
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'product-details/:id', component:ProductDetails },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) }
];
