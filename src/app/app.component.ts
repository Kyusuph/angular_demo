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
  loading = false;
  error = null;

  @ViewChild('postForm') postForm: FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onSave(postData: Post) {
    // Send Http request
    this.loading = true;
    this.error = null;
    if (this.editPost) {
      const id = this.postId;
      const newPost = {
        ...postData,
        id
      };
      this.postService.updatePost(newPost)
        .subscribe((response) => {
          this.loadedPosts[this.postIndex] = newPost;
          this.loading = false;
          this.onClearForm();
        },
          (error) => {
            this.loading = false;
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
          this.loading = false;
          this.onClearForm();
        },
          (error) => {
            this.loading = false;
            this.error = error;
            console.error('Failed to save post: ', error.message);
          });
    }
  }

  onDelete() {
    this.loading = true;
    this.error = null;
    this.postService.deletePost(this.postId)
      .subscribe((response) => {
        this.loadedPosts.splice(this.postIndex, 1);
        this.loading = false;
        this.onClearForm();
      },
        (error) => {
          this.loading = false;
          this.error = error;
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
    this.loading = true;
    this.error = null;
    this.postService.deleteAllPosts().subscribe(res => {
      this.loading = false;
      this.loadedPosts = [];
    },
    (error) => {
      this.loading = false;
      this.error = error;
      console.log('Failed to delete posts: ' + error.message);
    });
  }

  private fetchPosts() {
    this.loading = true;
    this.error = null;
    this.postService.fetchPosts()
      .subscribe((response) => {
        this.loadedPosts = response;
        this.loading = false;
      },
        (error) => {
          this.loading = false;
          this.error = error;
          console.log(error);
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
