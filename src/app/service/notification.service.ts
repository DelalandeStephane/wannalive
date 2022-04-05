import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient, private chatService : ChatService) { }

  public createNotif(data: any) {
    data.createdAt = Date.now();
    this.chatService.sendNotification(data);
    return this.http
      .post< any >(`${environment.baseUrl}/notif/create-notif`,data
      );
  }

  public getNotifs() {
    const id = localStorage.getItem('auth-id');
    return this.http
      .get< any >(`${environment.baseUrl}/notif/get-notif/${id}`
      );
  }

  public getNotViewNotifs() {
    const id = localStorage.getItem('auth-id');
    return this.http
      .get< any >(`${environment.baseUrl}/notif/get-notif-not-view/${id}`
      );
  }

  public checkNotifs() {
    const id = localStorage.getItem('auth-id');
    return this.http
      .post< any >(`${environment.baseUrl}/notif/check-notifs/`,{id}
      );
  }

  public checkChatNotifs(NotifType: string, roomId : string) {
    const data = {
      userId : localStorage.getItem('auth-id'),
      type : NotifType,
      targetId : roomId
    };
    return this.http
      .post< any >(`${environment.baseUrl}/notif/check-chat-notifs/`,data
      );
  }

  public checkOneNotif(id :string) {
    return this.http
      .post< any >(`${environment.baseUrl}/notif/check-one-notif/`,{id}
      );
  }

  public acceptContact(data: any) {
    return this.http
      .post< any >(`${environment.baseUrl}/notif/accept-contact`,data
      );
  }
  public refuseContact(data: any) {
    return this.http
      .post< any >(`${environment.baseUrl}/notif/refuse-contact`,data
      );
  }
  

}
