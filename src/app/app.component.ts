import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  score = 0;
lastScore = 0;
  stopped = true;
  serverElements = [{type: 'server', name: 'Test server', content: 'Just a server'}];
  oddScores: number[] = [];
  evenScores: number[] = [];

  onServerCreated(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintCreated(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onFirstChange() {
    this.serverElements[0].name = 'Changed';
  }

  onStarted(score: number) {
    if(this.isOdd(score)) {
      this.oddScores.push(score);
    } else {
      this.evenScores.push(score);
    }
    this.stopped = false;
    this.score = score;
  }

  onStopped(score: number) {
    this.stopped = true;
    this.lastScore = score;
  }

  isOdd(value: number): boolean {
    let toReturn = true;
    if(value % 2 === 0) {
      toReturn = false;
    }
    return toReturn;
  }
}
