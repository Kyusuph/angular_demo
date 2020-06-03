import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { UserService } from './users.service';
import { CenterService } from './center.service';

@NgModule({
  declarations: [
    AppComponent,
    ActiveUsersComponent,
    InactiveUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [UserService, CenterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
