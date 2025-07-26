import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
    // Define your application routes here
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'product-details/:id', component: ProductDetails },
    { path: '**', component: NotFound }
];
