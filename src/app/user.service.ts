import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activateParagraph = new EventEmitter<boolean>();
}
