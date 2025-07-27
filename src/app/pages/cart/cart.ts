import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IcartItem } from '../../shared/icart-item';
import Swal from 'sweetalert2';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: IcartItem[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCartFromStorage();
  }

  // Load cart items from localStorage
  private loadCartFromStorage(): void {
    try {
      if (isPlatformBrowser(this.platformId)){
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          this.cartItems = JSON.parse(storedCart);
        } else {
          this.cartItems = [];
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this.cartItems = [];
    }
  }
 
  // Save cart items to localStorage
  private saveCartToStorage(): void {
    try {
      if (isPlatformBrowser(this.platformId)){
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Increase quantity of an item
  increaseQuantity(item: IcartItem): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      this.cartItems[index].quantity++;
      this.saveCartToStorage();
      this.showQuantityUpdateToast(item.title, this.cartItems[index].quantity);
    }
  }

  // Decrease quantity of an item
  decreaseQuantity(item: IcartItem): void {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1 && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCartToStorage();
      this.showQuantityUpdateToast(item.title, this.cartItems[index].quantity);
    }
  }

  // Remove item from cart with SweetAlert confirmation
  removeItem(item: IcartItem): void {
    Swal.fire({
      title: 'Remove Item?',
      html: `
        <div class="text-center">
          <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain mx-auto mb-4 rounded-lg">
          <p class="text-gray-600">Are you sure you want to remove<br><strong>"${item.title}"</strong><br>from your cart?</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Keep it',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-2',
        cancelButton: 'rounded-lg px-6 py-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.cartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (index !== -1) {
          this.cartItems.splice(index, 1);
          this.saveCartToStorage();
          Swal.fire({
            title: 'Removed!',
            text: 'Item has been removed from your cart.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'rounded-2xl',
            },
          });
        }
      }
    });
  }

  // Clear entire cart with confirmation
  clearCart(): void {
    if (this.cartItems.length === 0) {
      Swal.fire({
        title: 'Cart is Empty',
        text: 'Your cart is already empty!',
        icon: 'info',
        confirmButtonColor: '#3b82f6',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'rounded-lg px-6 py-2',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Clear Cart?',
      html: `
        <div class="text-center">
          <div class="text-4xl mb-4">🛒</div>
          <p class="text-gray-600">Are you sure you want to remove<br><strong>all ${this.getTotalItems()} items</strong><br>from your cart?</p>
          <p class="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear cart!',
      cancelButtonText: 'Keep items',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-2',
        cancelButton: 'rounded-lg px-6 py-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartItems = [];
        this.saveCartToStorage();
        Swal.fire({
          title: 'Cart Cleared!',
          text: 'All items have been removed from your cart.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl',
          },
        });
      }
    });
  }

  // Get total number of items in cart
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Get subtotal (before tax)
  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Get tax amount (8%)
  getTax(): number {
    return this.getSubtotal() * 0.08;
  }

  // Get total (subtotal + tax)
  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  // Get total for a specific item
  getItemTotal(item: IcartItem): number {
    return item.price * item.quantity;
  }

  // Show toast notification for quantity updates
  private showQuantityUpdateToast(
    itemTitle: string,
    newQuantity: number
  ): void {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-xl',
      },
    });

    toast.fire({
      icon: 'success',
      title: `Quantity updated!`,
      text: `${itemTitle.substring(0, 30)}... (${newQuantity})`,
    });
  }
}
