import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  public async createPost(data: any, userId :any) {
    data.createdAt = Date.now();
    data.userName = String(localStorage.getItem('auth-name'));
    return this.http
      .post< any >(`${environment.baseUrl}/post/create-post/${userId}`,data
      );
  }

  public  getAllUserPosts(userId :any) {
    return this.http
      .get< any >(`${environment.baseUrl}/post/get-all-user-posts/${userId}`);
  }

  public  getAllPosts(userId :any) {
    return this.http
      .get< any >(`${environment.baseUrl}/post/get-all-posts/${userId}`);
  }

  public  getPost(profilId :any) {
    return this.http
      .get< any >(`${environment.baseUrl}/post/get-post/${profilId}`);
  }

  public updatePost(data: any){
    return this.http
      .post< any >(`${environment.baseUrl}/post/update-post/`,data
      );
  }

  public deletePost(postId : string, userIdForAuth : any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        postId,
        userIdForAuth
      },
    };

    return this.http
      .delete< any >(`${environment.baseUrl}/post/delete-post`,options);
  }

  public  createComment(content :string, postId : string) {
    const data = {
      postId : postId,
      userId : localStorage.getItem('auth-id'),
      content : content,
      createdAt : Date.now(),
      userName : String(localStorage.getItem('auth-name'))
    }
    return this.http
      .post< any >(`${environment.baseUrl}/post/create-comment/`,data);
  }

  public  getComments(postId :any, limit: Number) {
    return this.http
      .get< any >(`${environment.baseUrl}/post/get-comments/${postId}/${limit}`);
  }

  public  getCommentsCount(postId :any) {
    return this.http
      .get< any >(`${environment.baseUrl}/post/get-comments-count/${postId}`);
  }

  public  deleteComment(commentId :string,userIdForAuth:string ) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        commentId,
        userIdForAuth
      },
    };

    return this.http
      .delete< any >(`${environment.baseUrl}/post/delete-comment`,options);
  }

  public  sendLike(postId : string, state : string) {
    const data = {
      postId : postId,
      userId : localStorage.getItem('auth-id'),
      state, 
    }
    return this.http
      .post< any >(`${environment.baseUrl}/post/send-like/`,data);
  }

}
