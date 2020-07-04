import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Post } from './post.model';
import { PostService } from './post.service';

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

  constructor(private postService: PostService) { }

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
      this.postService.updatePost(newPost)
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
      this.postService.createPost(postData)
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
    this.postService.deletePost(this.postId)
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
    this.postService.fetchPosts()
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
