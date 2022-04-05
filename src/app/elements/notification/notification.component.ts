import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public imagePath:any = '../../assets/img/picture/no-photo.png';
  public targetUser : any;
  @Input() notification : any;

  constructor(private userService : UserService,
     private notifService : NotificationService, 
     private router : Router  ) {
   }

  ngOnInit(): void {
    console.log(this.notification);
    this.userService.getUserAvatar(this.notification.emitterId).subscribe(avatar => {
      if(avatar){
        this.imagePath = `${environment.imgUrl}/avatar/${avatar.name}`;
      }else {
        this.imagePath = '../../assets/img/picture/no-photo.png';
      }
    })
    
  }

  public acceptContact(){
    const data = {
      idApplicant : this.notification.targetId,
      idRecipient : this.notification.userID,
      notifId: this.notification._id
   }

   this.notifService.acceptContact(data).subscribe((notif) => {
      this.notification = notif;
   });

  }
  public refuseContact(){
    const data = {
      idApplicant : this.notification.targetId,
      idRecipient : this.notification.userID,
      notifId: this.notification._id
   }
   this.notifService.refuseContact(data).subscribe();

  }

  public showMessage(){
    this.router.navigate(['/chat',this.notification.targetId]);
  }

}
