import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';

export const routes: Routes = [
    // Define your application routes here
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
    { path: 'product-details/:id', loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails) },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) }
];
