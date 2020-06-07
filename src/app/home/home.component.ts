import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activated = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.activateParagraph.subscribe((data: boolean) => {
      this.activated = data;
    });
  }

  onActivate() {
    this.userService.activateParagraph.emit(true);
  }

}
