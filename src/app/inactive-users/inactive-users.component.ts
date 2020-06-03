import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  @Input() users: string[];

  @Output() setToActive = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
  }

  onSetToActive(id: number) {
    this.setToActive.emit(id);
  }
}
