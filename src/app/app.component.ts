import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post('https://demoz-app.firebaseio.com/posts.json', postData)
        .subscribe((response) => {
          console.log(response);
        },
        (error) => {
          console.error('Failed to save post: ', error.message);
        });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get('https://demoz-app.firebaseio.com/posts.json')
      .pipe(map(response => {
        const responseArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            responseArray.push({...response[key], id: key});
          }
        }
        return responseArray;
      }))
      .subscribe((response) => {
      console.log(response);
    });
  }
}
