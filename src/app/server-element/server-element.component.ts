import { Component, OnInit, Input, OnChanges, SimpleChanges, ContentChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, AfterViewInit {
  // @Input('srvElement') element: {type: string, name: string, content: string};
  @Input('srvName') name: string;
  @ContentChild('paragraphContent') paragraph: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changed');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('Paragraph1 is ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit() {
    console.log('Paragraph2 is ' + this.paragraph.nativeElement.textContent);
  }

}
