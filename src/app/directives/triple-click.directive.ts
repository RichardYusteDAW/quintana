import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTripleClick]'
})
export class TripleClickDirective {

  @Output() tripleClick = new EventEmitter<MouseEvent>();

  private clickCount = 0;
  private clickTimer: any;

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    this.clickCount++;

    if (this.clickCount === 3) {
      this.tripleClick.emit(event);
      this.resetClicks();
      return;
    }

    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => this.resetClicks(), 400);
  }

  private resetClicks() {
    this.clickCount = 0;
  }
}