import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'yellow';
  @Input('appBetterHighlight') defaultColor = 'yellow';
  @Input() highlightColor = 'red';
  @HostListener('mouseleave') mouseleave() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', this.defaultColor);
    this.backgroundColor = this.defaultColor;
  }
  @HostListener('mouseenter') mouseenter() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', this.highlightColor);
    this.backgroundColor = this.highlightColor;
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.highlightColor);
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow');
  }
}
