import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.scss']
})
export class AdminCommentComponent implements OnInit {
  public commentList : any;
  displayedColumns: string[] = ['ID','postId', 'userId', 'comment','action'];

  constructor(private adminService : AdminService,public dialog : MatDialog) { }

  ngOnInit(): void {

    this.adminService.getAllComments().subscribe((commentList) => {
      commentList.forEach((comment:any) => {
        comment.deleteAction = false;
    });
      this.commentList = commentList;
   })
  }

  public deleteComment(comment:any){
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){
        this.adminService.deleteComment(comment._id).subscribe(() => {
            comment.deleteAction = true;
        })
      }
    })
  }

}
