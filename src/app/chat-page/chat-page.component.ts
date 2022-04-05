import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DialogDeleteElementComponent } from '../material/dialog-delete-element/dialog-delete-element.component';
import { ChatService } from '../service/chat.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  //Update notif on navbar
  public NotifsAfterChatCheck : any;
  public NotifsAfterChatCheckCount:any;


  public chatForm : FormGroup;
  public listenerSearch : FormGroup;
  public userPlaceHolder : string = 'Ajouter un contact';
  public messageList: any;
  public actualUser :string = String(localStorage.getItem('auth-id'));
  requestPanelOpenState = false;
  panelOpenState = false;
  optionsOrigin: string[] = [];
  options: string[] = [];
  user = new FormControl('');
  requestListenerToSend: any = []; // list of Id
  requestListenerList: any = []; // list of name
  private contactList :any = [];
  public roomList: any[] = [];
  public actualRoom? : any;
  filteredOptions?: Observable<any>;

  constructor(private fb: FormBuilder,
     private userService : UserService, 
     private chatService : ChatService,
     private notifService : NotificationService,
     private activatedRoute: ActivatedRoute,
     public dialog : MatDialog) { 
    this.chatForm = this.fb.group ({});
    this.listenerSearch = this.fb.group ({});
   }

  ngOnInit(): void {
    // Show new messages form other chat users
    this.chatService.onNewMessage().subscribe((data :any) => {
      if( this.actualRoom && data.roomId === this.actualRoom._id){
        this.messageList.push(data.dataMessage);
      }

    });

    this.chatService.deleteMessageSocket().subscribe((data :any) => {
      this.messageList = this.messageList.filter(function(message:any) { return message._id !== data.messageId})
    });
   



    // Show all discutions for actual user
    this.chatService.getRoomsList(this.actualUser).subscribe(roomList => {
      this.roomList = roomList;
        let roomName='';
        let roomId ="";
        this.roomList.forEach((room:any) => {
          if(room.usersChat[0].name === String(localStorage.getItem('auth-name'))){
            roomName = room.usersChat[1].name;
            roomId = room.usersChat[1].id;
          }
          else if(room.usersChat[1].name === String(localStorage.getItem('auth-name'))){
            roomName = room.usersChat[0].name;
            roomId = room.usersChat[0].id;
          }


          this.userService.getUserAvatar(String(roomId)).subscribe(avatar => {
            if(avatar){
              room.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
            }else {
              room.avatarPath = '../../assets/img/picture/no-photo.png';
            }
          })
          room.avatarPath


          room.roomName = roomName;
        })

    } )



    this.chatForm = this.fb.group({
      message:['',[Validators.required]],
    });

    this.listenerSearch = this.fb.group({
    });

    this.userService.getContactFromList(this.actualUser).subscribe((contactList) => {
      this.contactList = contactList;
        this.contactList.forEach((contact :any) => {
          this.optionsOrigin.push(contact.userName);
            this.options.push(contact.userName);
        });
    })

    this.filteredOptions = this.user.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.activatedRoute.params.subscribe(
      (params:any) => {
        if(params.id) {
          this.getRoom(params.id);
        }
      }
    )
  }


  private _filter(value: string) {
    if(value){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    return;
  }

  public listenerSubmit(){
    
    const listener = this.contactList.find((contact :any) => contact.userName === this.user.value);
    if(listener){
      this.requestListenerToSend.push({id :listener._id, name: listener.userName});
      this.requestListenerList.push(listener.userName);
      this.options = this.options.filter( (option :string)  => option !== this.user.value )
      this.user.reset();
      this.userPlaceHolder = 'Ajouter un autre contact';
    }
    
  }

  public createDiscutionRoom(){

      let roomExist = false;

      let roomExistInserted = false; // for catch room match id 

      let roomExistId = '';

      this.options = this.optionsOrigin;

     this.requestListenerToSend.push({id :String(localStorage.getItem('auth-id')), name : String(localStorage.getItem('auth-name'))});
      this.roomList.forEach(room => {
        //convert object in string for compare if both object as identical
        if(JSON.stringify(room.usersChat) === JSON.stringify(this.requestListenerToSend)){
          roomExist = true;
          roomExistInserted = true;
          this.requestListenerToSend = [];
          this.requestListenerList = [];
          this.requestPanelOpenState = false;
        }
        if(roomExistInserted){
          roomExistId = room._id;
          roomExistInserted = false;
        }
      })
      if(!roomExist){
        this.chatService.createRoom(this.requestListenerToSend).subscribe((room) => {
          room.roomName = room.usersChat[0].name;
          this.roomList.push(room);
          this.requestListenerList = [];
          this.requestPanelOpenState = false;
          this.requestListenerToSend = [];
        })
      }else {
          this.getRoom(roomExistId);
      }

  }

  public chatSubmit() {
    if (this.chatForm.invalid) {
      return;
    }
      const value = this.chatForm.value;
      const data = {
        emitterUser : localStorage.getItem('auth-id'),
        emitterName : String(localStorage.getItem('auth-name')),
        content : value.message,
        createdAt : Date.now()
      };
      const roomId = this.actualRoom._id
      const usersChat = this.actualRoom.usersChat;
      this.chatService.sendMessage(data, roomId, usersChat).subscribe(() => {
        this.chatForm.reset();
        this.messageList.push(data);
      })
      //send notif
        this.actualRoom.usersChat.forEach((user:any) => {
          if(user.id !== localStorage.getItem('auth-id')){
            const notifData = {
              idApplicant : String(localStorage.getItem('auth-id')),
              idRecipient : user.id,
              type : 'send-message',
              emitterName : String(localStorage.getItem('auth-name')),
              targetId:this.actualRoom._id
           }
           this.notifService.createNotif(notifData).subscribe(() => {}) 
          }
        });
  }

  public getRoom(roomId : string){
    this.panelOpenState = false;
    this.chatForm.reset();
    this.chatService.getRoom(roomId).subscribe(room => {
      this.actualRoom = room;
      this.messageList = room.messages;
      if(this.actualRoom){
        this.notifService.checkChatNotifs('send-message', this.actualRoom._id).subscribe(notifList => {
          this.NotifsAfterChatCheck = notifList;
          this.NotifsAfterChatCheckCount = notifList.length;
        })
      }
    })
  }

  public deleteMessage(emitter :string,messageId:string){
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){

        this.chatService.deleteMessage(this.actualRoom._id,emitter,messageId, this.actualRoom.usersChat).subscribe(() => {

  
        })
      }
    })
  }



}
