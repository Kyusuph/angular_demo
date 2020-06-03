import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  @Input() users: string[];
  @Output() setToInActive = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
  }

  onSetToInactive(id: number) {
    this.setToInActive.emit(id);
  }
}
