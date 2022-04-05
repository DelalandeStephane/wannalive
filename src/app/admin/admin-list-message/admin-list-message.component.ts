import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-list-message',
  templateUrl: './admin-list-message.component.html',
  styleUrls: ['./admin-list-message.component.scss']
})
export class AdminListMessageComponent implements OnInit {
  private chatId : string = '';
  public messageList : any;
  displayedColumns: string[] = ['ID', 'emitterId', 'emitterName', 'content','createdAt','action'];
  constructor(private route: ActivatedRoute, private adminService :AdminService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.params['id'];
    this.adminService.getAllMessagesFromChat(this.chatId).subscribe((messageList) => {
      this.messageList = messageList;
    })
  }


  public deleteMessage(element:any){

    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){

        this.adminService.deleteMessage(this.chatId,element._id).subscribe(() => {
            element.deleteAction = true;
        })
      }
    })
  }

}
