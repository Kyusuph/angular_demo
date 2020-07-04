import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {}

  createPost(postData: Post) {
    return this.http.post<{ name: string }>('https://demoz-app.firebaseio.com/posts.json', postData);
  }
  updatePost(post: Post) {
    return this.http.put<Post>(`https://demoz-app.firebaseio.com/posts/${post.id}.json`, post);
  }

  fetchPosts() {
    const httpOptions = {
      headers: new HttpHeaders({
        name: 'Kayson',
        age: '26'
      }),
      params: new HttpParams().set(
        'print', 'pretty'
      )
    }
    return this.http.get<{ [key: string]: Post }>('https://demoz-app.firebaseio.com/posts.json', httpOptions)
      .pipe(map((response) => {
        const responseArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            responseArray.push({ ...response[key], id: key });
          }
        }
        return responseArray;
      }));
  }

  deletePost(id: string) {
    return this.http.delete(`https://demoz-app.firebaseio.com/posts/${id}.json`);
  }

  deleteAllPosts() {
    return this.http.delete(`https://demoz-app.firebaseio.com/posts.json`);
  }
}
