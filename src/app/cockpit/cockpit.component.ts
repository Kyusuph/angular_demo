import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // newServerName = '';
  // newServerContent = '';
  readOnlyVal = false;
  @ViewChild('serverContent') serverInputContent: ElementRef;

  @Output('svrCreated') serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
  this.serverCreated.emit({
    serverName: nameInput.value,
    serverContent: this.serverInputContent.nativeElement.value
  });
}

onAddBlueprint(nameInput: HTMLInputElement) {
  this.blueprintCreated.emit({
    serverName: nameInput.value,
    serverContent: this.serverInputContent.nativeElement.value
  });
}

}
