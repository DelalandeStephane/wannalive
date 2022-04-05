import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {
  public chatRooms:any;
  displayedColumns: string[] = ['ID', 'usersChat', 'nbMessage','action'];

  constructor(private adminService : AdminService, public dialog : MatDialog, private router : Router) { }

  ngOnInit(): void {

    this.adminService.getAllChatRooms().subscribe((chatRooms) => {
      chatRooms.forEach((comment:any) => {
        comment.deleteAction = false;
      });
          this.chatRooms = chatRooms;
      })
  }

  public seeChat(id:string){
    this.router.navigate([`/admin/list-messages`,id]);

  }
  public deleteChat(post:any){
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){
        this.adminService.deleteChat(post._id).subscribe(() => {
            post.deleteAction = true;
        })
      }
    })
  }


}
