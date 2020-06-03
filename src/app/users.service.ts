import { Injectable } from '@angular/core';
import { CenterService } from './center.service';

@Injectable()
export class UserService {
  inActiveUsers = ['John', 'Jack', 'Irene'];
  activeUsers = ['Kayson', 'Gift', 'Elia'];

  constructor(private centerService: CenterService) {}

  activateUser(id: number) {
    const user = this.inActiveUsers[id];
    this.activeUsers.push(user);
    this.inActiveUsers.splice(id, 1);
    this.centerService.countActivation();
  }

  deActivateUser(id: number) {
    const user = this.activeUsers[id];
    this.inActiveUsers.push(user);
    this.activeUsers.splice(id, 1);
    this.centerService.countDeActivation();
  }
}
