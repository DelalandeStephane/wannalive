import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post : any;
  @Output() deleteAction = new EventEmitter<boolean>();

  public imagePath:any = '../../assets/img/picture/no-photo.png';
  public targetId:String = '';
  public userId: string = '';
  public profilId: string = '';
  public updateMode : boolean = false;
  userStatus : any = localStorage.getItem('auth-status')

  constructor(private userService : UserService, private postService : PostService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.targetId = this.post.userID;
    this.profilId = this.post.userID;
    this.userId = String(localStorage.getItem('auth-id'));
    this.userService.getUserAvatar(String(this.targetId)).subscribe(avatar => {
      if(avatar){
        this.imagePath = `${environment.imgUrl}/avatar/${avatar.name}`;
      }
    })
  }

  public updatePost(){
      this.updateMode = true;
  }

  public  deletePost(){
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
      deleteAction.afterClosed().subscribe(confirm => {
        if ( confirm === true){
          this.postService.deletePost(this.post._id,this.post.UserID).subscribe(() => {
            this.deleteAction.emit(true);
          });
        }
      })
    }
  public updateAction(event: any){
    this.post = event;
    this.updateMode = false;
  }
}
