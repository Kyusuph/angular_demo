import { Component, OnInit } from '@angular/core';

import { UserService } from './users.service';
import { CenterService } from './center.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  actvCount;
  inActvCount;

  constructor(
    private centerService: CenterService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.actvCount = this.centerService.activationCount;
    this.inActvCount = this.centerService.deActivationCount;
  }
}
