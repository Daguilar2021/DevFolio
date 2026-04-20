import { Component, signal, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../components/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('my-devfolio');

  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target); // animate once only
          }
        }
      },
      { threshold: 0.15 },
    );

    const targets = this.el.nativeElement.querySelectorAll('.scroll-reveal');
    targets.forEach((el: Element) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
