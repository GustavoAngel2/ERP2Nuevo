import { Component,HostListener,OnInit } from '@angular/core';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css'
})
export class CursorComponent implements OnInit{
  private cursor: HTMLElement | null = null;
  private cursor2: HTMLElement | null = null;

  ngOnInit(): void {
    // Obtén las referencias a los elementos del DOM
    this.cursor = document.querySelector('.cursor');
    this.cursor2 = document.querySelector('.cursor2');

    if (!this.cursor || !this.cursor2) {
      console.error('Cursor elements not found in the DOM.');
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.cursor && this.cursor2) {
      const style = `left: ${event.clientX}px; top: ${event.clientY}px;`;
      this.cursor.style.cssText = style;
      this.cursor2.style.cssText = style;
    }
  }
  @HostListener('document:mouseover', ['$event'])
onMouseOver(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (
    target.tagName === 'INPUT' || 
    target.tagName === 'BUTTON' || 
    target.tagName === 'A' || 
    target.tagName === 'SELECT' || 
    target.tagName === 'TEXTAREA' || target.tagName === 'mat-expansion-panel'
  ) {
    this.cursor?.classList.add('hovered');
  }
}

@HostListener('document:mouseout', ['$event'])
onMouseOut(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (
    target.tagName === 'INPUT' || 
    target.tagName === 'BUTTON' || 
    target.tagName === 'A' || 
    target.tagName === 'SELECT' || 
    target.tagName === 'TEXTAREA' || target.tagName === 'mat-expansion-panel'
  ) {
    this.cursor?.classList.remove('hovered');
  }
}

}
