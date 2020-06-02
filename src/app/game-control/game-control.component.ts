import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  gameTimer;
  score = 0;
  gameStarted = false;
  myTimeInterval;
  @Output('gameStarted') startGame = new EventEmitter<number>();
  @Output('gameStopped') stopGame = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onGameStart() {
    this.gameTimer = setInterval(() => {
      this.score++;
      this.startGame.emit(this.score);
    }, 1000);
    this.gameStarted = true;
  }

  onGameStop() {
    clearInterval(this.gameTimer);
    console.log('Stopped');
    this.gameStarted = false;
    this.stopGame.emit(this.score);
  }

}
