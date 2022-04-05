import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, AfterViewChecked {
  posts:any;
  profilId : string = '';
  userId : string = '';
  fragment : any;
  constructor(private postService : PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.profilId = this.route.snapshot.parent?.params['id'];
    this.userId = String(localStorage.getItem('auth-id'));
     this.postService.getAllUserPosts(this.profilId).subscribe(posts => {
       this.posts = posts;
     })
  }

  ngAfterViewChecked(): void {
  try {
      if(this.fragment) {
          document.querySelector('#' + this.fragment)!.scrollIntoView();
      }
  } catch (e) { }
}

  getNewPost(items:any){
    this.posts = items;
  }

    // only if is the user profil
    public updateListPost(){
      this.postService.getAllUserPosts(this.profilId).subscribe(posts => {
        this.posts = posts;
      })
    }

}
