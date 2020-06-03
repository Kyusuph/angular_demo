import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  inactiveUsers = ['John', 'Jack', 'Irene'];
  activeUsers = ['Kayson', 'Gift', 'Elia'];

  ngOnInit() {
  }

  onSetStatus(status: string, id: number) {
    let user;
    if( status === 'inActive') {
      user = this.activeUsers[id];
      this.inactiveUsers.push(user);
      this.activeUsers.splice(id, 1);
    } else {
      user = this.inactiveUsers[id];
      this.activeUsers.push(user);
      this.inactiveUsers.splice(id, 1);
    }
  }
}
