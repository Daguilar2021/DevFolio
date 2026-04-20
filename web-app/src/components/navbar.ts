import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    isScrolled = false;
    activeSection = 'hero';
    mobileOpen = false;

    @HostListener('window:scroll')
    onScroll(): void {
        // Add background when scrolled past 50px
        this.isScrolled = window.scrollY > 50;

        // Determine which section is currently in view
        const sections = ['projects', 'hero']; // check bottom-up
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 150) {
                    this.activeSection = id;
                    break;
                }
            }
        }
    }

    scrollTo(sectionId: string, event: Event): void {
        event.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        this.mobileOpen = false;
    }

    toggleMobile(): void {
        this.mobileOpen = !this.mobileOpen;
    }
}
