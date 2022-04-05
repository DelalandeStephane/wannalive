import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  public getAllUsers() {
    return this.http
      .get< any >(`${environment.baseUrl}/admin/get-all-users/`
      );
  }

  public deleteUser(id:string){
    return this.http
    .post< any >(`${environment.baseUrl}/admin/delete-user/`,{id}
    );
  }

  public getAllPosts() {
    return this.http
      .get< any >(`${environment.baseUrl}/admin/get-all-posts/`
      );
  }

  public deletePost(id:string){
    return this.http
    .post< any >(`${environment.baseUrl}/admin/delete-post/`,{id}
    );
  }

  public getAllComments() {
    return this.http
      .get< any >(`${environment.baseUrl}/admin/get-all-comments/`
      );
  }

  public deleteComment(id:string){
    return this.http
    .post< any >(`${environment.baseUrl}/admin/delete-comment/`,{id}
    );
  }

  public getAllChatRooms() {
    return this.http
      .get< any >(`${environment.baseUrl}/admin/get-all-chat-rooms/`
      );
  }

  public getAllMessagesFromChat(id:string) {
    return this.http
      .get< any >(`${environment.baseUrl}/admin/get-all-messages-from-chat-room/${id}/`
      );
  }

  public deleteChat(id:string){
    return this.http
    .post< any >(`${environment.baseUrl}/admin/delete-chat-room/`,{id}
    );
  }

  public deleteMessage(chatId :string,messageId:string){
    return this.http
    .post< any >(`${environment.baseUrl}/admin/delete-message/`,{chatId,messageId}
    );
  }
}
