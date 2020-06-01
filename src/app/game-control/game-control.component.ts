import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  score = 0;
  gameStarted = false;
  myTimeInterval;
  @Output('gameStarted') startGame = new EventEmitter<number>();
  @Output('gameStopped') stopGame = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  gameControl(event: boolean) {
    const gameTimer = setInterval(() => {
      if (this.gameStarted) {
        this.score++;
        this.startGame.emit(this.score);
      }
    }, 1000);
    if (!event) {
      this.stopGame.emit(this.score);
      this.score = 0;
      clearInterval(gameTimer);
    }
    this.gameStarted = event;
  }

}
