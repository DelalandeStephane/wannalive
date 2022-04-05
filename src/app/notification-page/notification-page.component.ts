import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {
  public notifications : any;
  public chatNotifications : any;
  public contactNotifications : any;
  constructor(private NotifService : NotificationService) { }

  ngOnInit(): void {
      this.NotifService.getNotifs().subscribe((notifications) => {
        this.chatNotifications = notifications.filter((el:any) => el.type ==="send-message");
         this.contactNotifications = notifications.filter((el:any) => el.type ==="add-contact");
         this.notifications = notifications;
      })
      this.NotifService.checkNotifs().subscribe();
    }

}
