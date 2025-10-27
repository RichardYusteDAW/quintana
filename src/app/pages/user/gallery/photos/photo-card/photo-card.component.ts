import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-photo-card',
  imports: [],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.css'
})
export class PhotoCardComponent {
  @Input() img!: string;
  @Input() alt!: string;

  @ViewChild('card', { static: true }) card!: ElementRef<HTMLAnchorElement>;
  @ViewChild('refl', { static: true }) refl!: ElementRef<HTMLDivElement>;

  onEnter() {
    this.refl.nativeElement.style.opacity = '1';
  }

  onLeave() {
    const card = this.card.nativeElement;
    this.refl.nativeElement.style.opacity = '0';

    // Reset transformations
    card.style.transform = `perspective(500px) scale(1)`;
    card.style.transition = 'transform 0.3s ease';
  }

  onMove(e: MouseEvent) {
    const card = this.card.nativeElement;
    const ref = this.refl.nativeElement;

    const relX = (e.offsetX + 1) / card.offsetWidth;
    const relY = (e.offsetY + 1) / card.offsetHeight;

    const rotY = (relX - 0.5) * 60;   // [-30°, +30°]
    const rotX = (relY - 0.5) * -60;  // [-30°, +30°]

    // Apply transformations
    card.style.transform = `perspective(500px) scale(2) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

    // Reflection effect
    const lightX = this.scale(relX, 0, 1, 150, -50);
    const lightY = this.scale(relY, 0, 1, 30, -100);
    const lightConstrain = Math.min(Math.max(relY, 0.3), 0.7);
    const lightOpacity = this.scale(lightConstrain, 0.3, 1, 1, 0) * 255;
    const shade = `rgba(${lightOpacity}, ${lightOpacity}, ${lightOpacity}, 1)`;
    const black = `rgba(0, 0, 0, 1)`;
    ref.style.backgroundImage = `radial-gradient(circle at ${lightX}% ${lightY}%, ${shade} 20%, ${black})`;
  }

  private scale(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return outMin + (val - inMin) * (outMax - outMin) / (inMax - inMin);
  }
}
