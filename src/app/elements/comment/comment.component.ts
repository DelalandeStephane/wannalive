import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  public commentForm : FormGroup = this.fb.group({}) ;
  public commentList : any;
  public currentUser = localStorage.getItem('auth-id');
  private limitComments: Number = 1;
  public commentBlockOpen : boolean = false;
  public avatarPath : string = '';
 @Input() postId :string ="";
 @Input() likeCount : Number = 0;
 public isLiked : boolean = false;
 public commentsCount :Number = 0;
 public commentsShowed :Number = 0;
 userStatus : any = localStorage.getItem('auth-status')

  constructor(private fb: FormBuilder,private userService : UserService, private postService : PostService, public dialog : MatDialog) {
   }

  ngOnInit(): void {

    this.userService.getUserAvatar(String(localStorage.getItem('auth-id'))).subscribe(avatar => {
      if(avatar){
        this.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
      }else {
        this.avatarPath = '../../assets/img/picture/no-photo.png';
      }
    })

    if(this.userStatus !== "admin" ){
      this.userService.getLikedPostByCurrentUser(String(localStorage.getItem('auth-id'))).subscribe((result) => {
        if(result.likedPost.includes(this.postId)) {
          this.isLiked = true;
        }
      })
    }

    this.postService.getCommentsCount(this.postId).subscribe((commentsCount) => {
      this.commentsCount = commentsCount;
    })

    this.commentForm = this.fb.group({
      content:['',[Validators.required]],
    });



    this.postService.getComments(this.postId,this.limitComments).subscribe( commentList => {
      this.commentList = commentList;
      this.commentsShowed = commentList.length;
      this.commentList.forEach((comment:any) => {
          this.userService.getUserAvatar(comment.userId).subscribe(avatar => {
            if(avatar){
              comment.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
            }else {
              comment.avatarPath = '../../assets/img/picture/no-photo.png';
            }
          })
        });
       
    })

  }

  public commentSubmit(){
    if (this.commentForm.invalid) {
      return;
    }
      const value = this.commentForm.value.content;
      this.postService.createComment( value ,this.postId).subscribe((comment) => {
        this.commentForm.reset();
        this.userService.getUserAvatar(comment.userId).subscribe(avatar => {
          if(avatar){
            comment.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
          }else {
            comment.avatarPath = '../../assets/img/picture/no-photo.png';
          }
        })
        this.commentList.push(comment);
        this.commentsCount= Number(this.commentsCount) + 1;

      });
      
  }

  public deleteComment(comment : any){
    const userId = comment.userId
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){
          this.postService.deleteComment(comment._id, userId).subscribe(() => {
            this.postService.getComments(this.postId, this.limitComments).subscribe( commentList => {
              this.commentList = commentList;
              this.commentsCount = Number(this.commentsCount) - 1;
              this.commentList.forEach((comment:any) => {
                this.userService.getUserAvatar(comment.userId).subscribe(avatar => {
                  if(avatar){
                    comment.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
                  }else {
                    comment.avatarPath = '../../assets/img/picture/no-photo.png';
                  }
                })
              });
              
            })
          });
      }
    })
  }

  public moreComment(){
    let increment;
    if ( this.limitComments === 1){
      increment = 4;
      this.commentBlockOpen = true;
    } else {
      increment = 5;
    }
    this.limitComments = Number(this.limitComments) + increment ;
    this.postService.getComments(this.postId, this.limitComments).subscribe( commentList => {
      this.commentList = commentList;
      this.commentsShowed = commentList.length;
      this.commentList.forEach((comment:any) => {
        this.userService.getUserAvatar(comment.userId).subscribe(avatar => {
          if(avatar){
            comment.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
          }else {
            comment.avatarPath = '../../assets/img/picture/no-photo.png';
          }
        })
      });
    })
  }

  public lessComment(){
     this.limitComments = 1 ;
     this.commentBlockOpen = false;
    this.postService.getComments(this.postId, this.limitComments).subscribe( commentList => {
      this.commentList = commentList;
      this.commentsShowed = commentList.length;
      this.commentList.forEach((comment:any) => {
        this.userService.getUserAvatar(comment.userId).subscribe(avatar => {
          if(avatar){
            comment.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
          }else {
            comment.avatarPath = '../../assets/img/picture/no-photo.png';
          }
        })
      });
    })
  }

  public sendLike(){
    let state;
    if(this.isLiked === false){
      this.likeCount = Number(this.likeCount) + 1;
      this.isLiked = true;
      state = 'up'
    } else {
      this.likeCount = Number(this.likeCount) - 1;
      this.isLiked = false;
      state = 'down';
    }
    this.postService.sendLike(this.postId,state).subscribe();
}

}
