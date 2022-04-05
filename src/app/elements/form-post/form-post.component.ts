import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {
  @Output() newPosts= new EventEmitter<any>();
  @Output() updatedPost= new EventEmitter<any>();
  @Input() content = '';
  @Input() updateMode : boolean = false;
  @Input() post : any;
  @Input() targetForm : string = ''
  postForm : FormGroup; 
  constructor(private fb: FormBuilder, private postService : PostService) {
    this.postForm = this.fb.group ({});
   }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      post:[this.content,[Validators.required]],
    });
  }

  public async postSubmit(){
    if (this.postForm.invalid) {
      return;
    }
      const value = this.postForm.value;
      if(!this.updateMode){
        (await this.postService.createPost(value,String(localStorage.getItem('auth-id')))).subscribe(() => {
          this.postForm.reset();
          if(this.targetForm ==="main-page"){
            this.postService.getAllPosts(String(localStorage.getItem('auth-id'))).subscribe(posts => {
              this.newPosts.emit(posts);
            })
          }
          else if (this.targetForm ==="profil-page"){
            this.postService.getAllUserPosts(String(localStorage.getItem('auth-id'))).subscribe(posts => {
              this.newPosts.emit(posts);
            })
          }

        });
      } else if (this.updateMode){
        const data = {
          value : value,
          postId : this.post._id,
          userIdForAuth :  this.post.userID
        };
        this.postService.updatePost(data).subscribe(() => {
          this.postService.getPost(this.post._id).subscribe(post => {
            this.updatedPost.emit(post[0]);
          })
        })
      }

  }
}
