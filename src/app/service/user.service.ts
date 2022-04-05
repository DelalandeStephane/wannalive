import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {  
    
  }

 public async uploadAvatar(file: File, user:any) {
  const formData: FormData = new FormData();
  const fileName = `a-${user}`;
   formData.append('avatar', file, fileName);
   formData.append('filename',fileName);
   formData.append('ext',file.type);
    return this.http
      .post< FormData >(`${environment.baseUrl}/user/upload-avatar/${user}`,formData
      );
  }

  public async uploadBackground(file: File, userId:string) {
    const formData: FormData = new FormData();
    const fileName = `b-${userId}`;
     formData.append('background', file, fileName);
     formData.append('filename',fileName);
     formData.append('ext',file.type);
      return this.http
        .post< FormData >(`${environment.baseUrl}/user/upload-background/${userId}`,formData
        );
    }

  public getUserAvatar(id : string){
    return this.http.get<any>(`${environment.baseUrl}/user/get-user-avatar/${id}`);
  }

  public getUserBackground(id : string){
    return this.http.get<any>(`${environment.baseUrl}/user/get-user-background/${id}`);
  }

  public  getMusicalGenre(){
    const musicalGenre = [
      'rock',
      'pop',
      'jazz',
      'soul',
      'rap',
      'folk',
      'punk',
      'metal',
      'hiphop',
      'rnb',
      'blues',
      'country',
      'funk',
      'reggae',
      'electro',
      'traditionnelle'
    ];
    return musicalGenre;
  }

  public  getOrganizerType(){
    const organizerType = [
      'salle de concert',
      'festival',
      'tremplin',
      'organisateur'
    ];
    return organizerType;
  }

  public getUser(id :string){
    return this.http.get<Users>(`${environment.baseUrl}/user/get-user/${id}`);
  }

  public getAllUser(userQuery? : any){
    const id = localStorage.getItem('auth-id');
    return this.http.post<[Users]>(`${environment.baseUrl}/user/get-all-user/${id}`,userQuery);
  }

  public updateUser(user : Users, userIdForAuth : any){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/update-user/${userIdForAuth}`,user
    );
  }

  public addContact( idApplicant : string, idRecipient : string){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/add-contact`,{idApplicant, idRecipient}
    );
  }

  public addRequestContact(targetId : string){
    const data =  {
      userId: String(localStorage.getItem('auth-id')),
      targetId
    };
    return this.http
    .post< Users >(`${environment.baseUrl}/user/add-request-contact`, data
    );
  }

  public deleteContact( idApplicant : string, idRecipient : string){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/delete-contact`,{idApplicant, idRecipient}
    );
  }

  // get list of users id
  public getContactList(id :string){
    return this.http
    .get< any >(`${environment.baseUrl}/user/get-contact-list/${id}`
    );
  }

  // Get all data of users from in contactList
  public getContactFromList(id :string){
    return this.http
    .get< any >(`${environment.baseUrl}/user/get-contact-from-list/${id}`
    );
  }

  public getContactCount(id :string){
    return this.http
    .get< any >(`${environment.baseUrl}/user/get-contact-count/${id}`
    );
  }

  public getRequestContactList(id :string){
    return this.http
    .get< any >(`${environment.baseUrl}/user/get-request-contact-list/${id}`
    );
  }

  public getLikedPostByCurrentUser(id :string){
    return this.http
    .get< any >(`${environment.baseUrl}/user/get-liked-post-by-curent-user/${id}`
    );
  }

  public verifyPasssword(password : string, userId:string){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/verify-password/${userId}`,{password}
    );
  }

  public updatePassword(password:string,userIdForAuth:string){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/update-password/`,{password,userIdForAuth}
    );
  }
  public forgetPassword(email:string){
    return this.http
    .post< Users >(`${environment.baseUrl}/user/forget-password/`,{email}
    );
  }  

}