import { Component, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-TypingEffect',
    templateUrl: './TypingEffect.html',
    styleUrl: './TypingEffect.css',
})
export class TypingEffect implements OnInit {
    titles = [
        'GIS Developer',
        'Software Engineer',
        'AI/ML Enthusiast'
    ];
    currentTitleIndex = 0;
    
    // Use an Angular Signal to ensure the UI updates instantly on every character
    displayedTitle = signal('');
    
    typingSpeed = 80; // ms per character
    deletingSpeed = 40; // ms per character
    pauseDuration = 2000; // ms to pause on full title
    
    private isDeleting = false;

    ngOnInit(): void {
        this.startTypingEffect();
    }

    startTypingEffect() {
        const currentTitle = this.titles[this.currentTitleIndex];
        const currentText = this.displayedTitle();
        
        if (this.isDeleting) {
            this.displayedTitle.set(currentTitle.substring(0, currentText.length - 1));
        } else {
            this.displayedTitle.set(currentTitle.substring(0, currentText.length + 1));
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        const newText = this.displayedTitle();

        if (!this.isDeleting && newText === currentTitle) {
            typeSpeed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && newText === '') {
            this.isDeleting = false;
            this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
            typeSpeed = 500; // brief pause before typing next word
        }

        setTimeout(() => this.startTypingEffect(), typeSpeed);
    }
}
