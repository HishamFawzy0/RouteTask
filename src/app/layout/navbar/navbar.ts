import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isDark = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;

      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        this.isDark = false;
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        this.isDark = true;
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        this.isDark = true;
      } else {
        this.isDark = false;
      }
    }
  }
}
