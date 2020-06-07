import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  subscription: Subscription;
  observableDemo: Observable<number>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.subscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    this.observableDemo = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.subscription = this.observableDemo.pipe(filter((value: any) => {
      return value > 0;
    }), map((data: any) => {
      return 'Count value is ' + data;
    })).subscribe((data: any) => {
      console.log(data);
    },
      error => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log('Completed!');
      });
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
