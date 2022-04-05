import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../models/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authData : any;
  private isLoggedIn: Boolean;
  constructor(private http : HttpClient, private router : Router) {  
    this.isLoggedIn = false;
  }

  public isLogged (auth :any) {
    this.isLoggedIn = true;
    this.authData = auth;
    localStorage.setItem('is-logged-in', String(this.isLoggedIn));
    localStorage.setItem('auth-token', this.authData.token);
    localStorage.setItem('auth-id', this.authData.userId);
    localStorage.setItem('auth-name', this.authData.userName);
  }

  public adMinIsLogged (auth :any) {
    this.isLoggedIn = true;
    this.authData = auth;
    localStorage.setItem('is-logged-in', String(this.isLoggedIn));
    localStorage.setItem('auth-token', this.authData.token);
    localStorage.setItem('auth-id', this.authData.userId);
    localStorage.setItem('auth-name', this.authData.userName);
    localStorage.setItem('auth-status', this.authData.userStatus);

  }

  public getLogged(){
    return this.isLogged;
  }

  public getAuthData(){
    return this.authData;
  }

  public getAuthToken(){
    return localStorage.getItem('auth-token');
  }
 
 public  signUp(user: Users) {
   user.numDep = user.department.split('-')[0];
    return this.http
      .post< Users >(`${environment.baseUrl}/auth/sign-up`,user
      );
  }

  public  signIn(user: AuthModel) {

    return this.http
      .post< AuthModel >(`${environment.baseUrl}/auth/sign-in`,user
      );
  }

  public  adminSignIn(user: AuthModel) {

    return this.http
      .post< AuthModel >(`${environment.baseUrl}/admin/sign-in`,user
      );
  }

  public logOut(){
    this.isLoggedIn = false;
    this.authData = undefined;
    localStorage.setItem('is-logged-in', String(this.isLoggedIn));
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-id');
    localStorage.removeItem('auth-name');
    localStorage.removeItem('auth-status');
    this.router.navigate(['/auth']);
  }

  public verifyEmail(email: string) {
    return this.http.get<Users>(`${environment.baseUrl}/auth/verify-email/${email}`);
  }

}
