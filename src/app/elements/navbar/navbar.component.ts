import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public asideToggle:boolean = false;
  @Input() notifCount: number =0;
  @Input() notifList:any;
  public userList:any[] = [] ;
  public connectedUsers: any;
  public actualUser = String(localStorage.getItem('auth-id'));
  userStatus : any = localStorage.getItem('auth-status');
  public avatarPath : string = '';

  constructor(
    private notifService : NotificationService,
    private chatService : ChatService,
    private router: Router,
    private userService : UserService
    ) { }

  ngOnInit(): void {


    this.userService.getUserAvatar(String(localStorage.getItem('auth-id'))).subscribe(avatar => {
      if(avatar){
        this.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
      }else {
        this.avatarPath = '../../assets/img/picture/no-photo.png';
      }
    })

    this.notifService.getNotViewNotifs().subscribe(notifs => {
        this.notifCount= notifs.length;
        this.notifList = notifs;
    })
    if(this.router.url !== "/chat"){
      this.chatService.getNotification().subscribe((data:any) => {
        if(data.type === "add-contact"){
          data.content = "Vous a envoyé une demande d'ajout";
        }
        else if(data.type === "send-message"){
          data.content = "Vous a envoyé un message";
        }
  
        data.targetName = data.emitterName;
        this.notifCount++;
        this.notifList.push(data);
      })
    }
    this.userList = this.chatService.userList;
    this.chatService.getContact().subscribe(connectedUsers => {
      this.userList=[];
      this.connectedUsers=[];
      this.connectedUsers = connectedUsers;
      if(this.userStatus !=="admin"){
        this.userService.getContactFromList(this.actualUser).subscribe((contactList) => {
          contactList.forEach((contact :any) => {
            if(this.connectedUsers.includes(contact._id)){
              this.userService.getUserAvatar(contact._id).subscribe(avatar => {
                if(avatar){
                  contact.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
                }else {
                  contact.avatarPath = '../../assets/img/picture/no-photo.png';
                }
              })
              this.userList.push(contact)
            }
          });
        })
      }
      this.chatService.testContact(this.userList);
  },)

  }

  public asideToggleAction () {
    if(this.asideToggle === false){
      this.asideToggle = true
    }else {
      this.asideToggle = false
    }

  }

  public actionNotif(notifId: string){
      this.notifService.checkOneNotif(notifId).subscribe(() => {

      })
  }

  

}
