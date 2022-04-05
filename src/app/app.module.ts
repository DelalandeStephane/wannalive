import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarComponent } from './elements/avatar/avatar.component';
import { LoginComponent } from './elements/login/login.component';
import { profilComponent } from './profil/profil.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import { AsideBarComponent } from './elements/aside-bar/aside-bar.component';
import { FormPostComponent } from './elements/form-post/form-post.component';
import { PostComponent } from './elements/post/post.component';
import { CommentComponent } from './elements/comment/comment.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { SearchContactComponent } from './search-contact/search-contact.component';
import { ContactCardComponent } from './elements/contact-card/contact-card.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NotificationComponent } from './elements/notification/notification.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { UpdatePasswordFormComponent } from './material/update-password-form/update-password-form.component';
import { ForgetPasswordFormComponent } from './material/forget-password-form/forget-password-form.component';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { AdminPostComponent } from './admin/admin-post/admin-post.component';
import { AdminCommentComponent } from './admin/admin-comment/admin-comment.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminMessageComponent } from './admin/admin-message/admin-message.component';
import { AdminListMessageComponent } from './admin/admin-list-message/admin-list-message.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewUserFormComponent,
    AvatarComponent,
    LoginComponent,
    profilComponent,
    NavbarComponent,
    AsideBarComponent,
    FormPostComponent,
    PostComponent,
    CommentComponent,
    ContactPageComponent,
    PresentationPageComponent,
    PostPageComponent,
    UpdateUserFormComponent,
    SearchContactComponent,
    ContactCardComponent,
    NotificationPageComponent,
    NotificationComponent,
    MainPageComponent,
    ChatPageComponent,
    UpdatePasswordFormComponent,
    ForgetPasswordFormComponent,
    AdminMainPageComponent,
    AdminPostComponent,
    AdminCommentComponent,
    AdminUserComponent,
    AdminMessageComponent,
    AdminListMessageComponent,
    AdminLoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
