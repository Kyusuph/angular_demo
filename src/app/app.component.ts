import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  editPost = false;
  postId; string;
  postIndex; number;
  isFetching = false;

  @ViewChild('postForm') postForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onSave(postData: Post) {
    // Send Http request
    this.isFetching = true;
    if (this.editPost) {
      const id = this.postId;
      const newPost = {
        ...postData,
        id
      };
      this.http.put<{ name: string }>(`https://demoz-app.firebaseio.com/posts/${id}.json`, newPost)
        .subscribe((response) => {
          this.loadedPosts[this.postIndex] = newPost;
          this.isFetching = false;
          this.onClearForm();
        },
          (error) => {
            this.isFetching = false;
            console.error('Failed to update post: ', error.message);
          });
    } else {
      this.http.post<{ name: string }>('https://demoz-app.firebaseio.com/posts.json', postData)
        .subscribe((response) => {
          const id = response.name;
          this.loadedPosts.push({
            ...postData,
            id
          });
          this.isFetching = false;
          this.onClearForm();
        },
          (error) => {
            this.isFetching = false;
            console.error('Failed to save post: ', error.message);
          });
    }
  }

  onDelete() {
    this.isFetching = true;
    this.http.delete<{ name: string }>(`https://demoz-app.firebaseio.com/posts/${this.postId}.json`)
      .subscribe((response) => {
        this.loadedPosts.splice(this.postIndex, 1);
        this.isFetching = false;
        this.onClearForm();
      },
        (error) => {
          this.isFetching = false;
          console.error('Failed to delete post: ', error.message);
        });
  }

  onClearForm() {
    this.editPost = false;
    this.postId = undefined;
    this.postIndex = undefined;
    this.postForm.reset();
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://demoz-app.firebaseio.com/posts.json')
      .pipe(map((response) => {
        const responseArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            responseArray.push({ ...response[key], id: key });
          }
        }
        return responseArray;
      }))
      .subscribe((response) => {
        this.loadedPosts = response;
        this.isFetching = false;
      },
        (error) => {
          this.isFetching = false;
          console.error('Failed to load posts: ' + error.message);
      });
  }

  onSelect(index: number) {
    this.editPost = true;
    this.postIndex = index;
    const { title, content, id } = this.loadedPosts[index];
    this.postId = id;
    this.postForm.setValue({ title, content });
  }
}
