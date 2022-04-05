import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket : any;
  public userList: any;
  constructor(private http : HttpClient) {
    this.socket = io('http://localhost:3000');
      this.socket.emit('connection user data req', {id : localStorage.getItem('auth-id')});
   }

  public getContactRequest(){
    this.socket.emit('get-contact');
  }
  public testContact(users:any){
      this.userList = users;
  }
  public  getContact(){
    return new Observable(observer => {
      this.socket.on('get-contact-response', (contacts:any) => {
        observer.next(contacts);
      });
    });
  }
  public createRoom(userList: any) {
    const data ={
      userChat : userList
    } ;

    return this.http
      .post< any >(`${environment.baseUrl}/chat/create-room`,data
      );
      
  }

  public getRoomsList(id: string){
    return this.http
    .get< any >(`${environment.baseUrl}/chat/get-rooms-list/${id}`
    );
  }

  public getRoom(id: string){
    this.socket.emit('create', {id :id});
    return this.http
    .get< any >(`${environment.baseUrl}/chat/get-room/${id}`
    );
  }

  public sendMessage(data: any, roomId : string, usersChat : any){
    this.socket.emit('sendMessage', { data: data, roomId : roomId, usersChat: usersChat  });
    return this.http
    .post< any >(`${environment.baseUrl}/chat/send-message/`,{data, roomId}
    );
  }
  
    onNewMessage() {
      return new Observable(observer => {
        this.socket.on('getNewMessage', (msg:any) => {
          observer.next(msg);
        });
      });
    }



    sendNotification(data:any){
      this.socket.emit('send-notify', data)
    }

    getNotification(){
      return new Observable(observer => {
        this.socket.once('get notification', (data:any) => {
          observer.next(data);
        });
      });
    }

    public deleteMessage(chatId :string,userIdForAuth : string,messageId:string, usersChat:any){
      this.socket.emit('delete-message-request',{messageId,usersChat});
      return this.http
      .post< any >(`${environment.baseUrl}/chat/delete-message/${userIdForAuth}`,{chatId,messageId}
      );
    }

    deleteMessageSocket() {
      return new Observable(observer => {
        this.socket.on('delete-message', (msg:any) => {
          observer.next(msg);
        });
      });
    }
}
