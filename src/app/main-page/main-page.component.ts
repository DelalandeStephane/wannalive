import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  posts:any;
  userId : string = '';
  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.userId = String(localStorage.getItem('auth-id'));
     this.postService.getAllPosts(this.userId).subscribe(posts => {
       this.posts = posts;
     })
  }

  getNewPost(items:any){
    this.posts = items;
  }

}
