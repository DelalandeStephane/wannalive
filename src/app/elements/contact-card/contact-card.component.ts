import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { Users } from 'src/app/models/users';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
 @Input() contactUser?:Users ;
 @Input() state? :any;
 @Input() requestContactList? :any;
 @Input() authData? : any;
 @Output() deleteAction = new EventEmitter<boolean>();
  public avatarPath: string = '';
 public targetId : any = '';
  constructor(private userService : UserService, private notifService : NotificationService, public dialog : MatDialog) { }

  ngOnInit(): void {

   

    if(!this.authData){
      this.authData = { userId: localStorage.getItem('auth-id')};
    }
     this.targetId = this.contactUser?._id;
    if(this.requestContactList){
      
      this.requestContactList.request_contact.forEach((reqContact:string) => {
        if(reqContact === this.contactUser?._id ){
          this.state = 'add-contact';
        }
    });
    }

    this.userService.getUserAvatar(this.targetId).subscribe(avatar => {
      if(avatar){
        this.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
      }else {
        this.avatarPath = '../../assets/img/picture/no-photo.png';
      }
    })

  }

  public addContact(id : any){
    if(this.authData.userId){
      const data = {
         idApplicant : String(this.authData.userId),
         idRecipient : id,
         type : 'add-contact',
         emitterName: localStorage.getItem('auth-name'),
         targetId : String(this.authData.userId)
      }

      this.notifService.createNotif(data).subscribe(() => {

      })

       this.userService.addRequestContact( data.idRecipient).subscribe(() => {
          this.state= data.type;
       })
    }

  }

  public deleteContact(id : any){
    if(this.authData.userId){
      const idApplicant = String(this.authData.userId);
      const idRecipient = id;
      const deleteAction = this.dialog.open(DialogDeleteElementComponent);
      deleteAction.afterClosed().subscribe(confirm => {
        if ( confirm === true){
          this.userService.deleteContact(idApplicant, idRecipient).subscribe(() => {
            this.deleteAction.emit(true);
          })
        }
      })
    }

  }

}
