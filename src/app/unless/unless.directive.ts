import { Directive, TemplateRef, Input, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit{
  @Input() set appUnless(condition: boolean) {
    if(!condition) {
      this.viewRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewRef: ViewContainerRef) { }

  ngOnInit() {
  }

}
