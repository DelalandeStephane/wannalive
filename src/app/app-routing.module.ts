import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { profilComponent } from './profil/profil.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import { SearchContactComponent } from './search-contact/search-contact.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminPostComponent } from './admin/admin-post/admin-post.component';
import { AdminCommentComponent } from './admin/admin-comment/admin-comment.component';
import { AdminMessageComponent } from './admin/admin-message/admin-message.component';
import { AdminListMessageComponent } from './admin/admin-list-message/admin-list-message.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path : 'auth', component : HomeComponent},
  { path : 'admin-auth', component : AdminLoginComponent},
  { path : 'inscription', component : NewUserFormComponent},
  { path : '', component : MainPageComponent,
    canActivate:[AuthGuard],
  },
  { path : 'profil/:id', component : profilComponent,
    canActivate:[AuthGuard],
    children:[
      { path : '', component : PostPageComponent,pathMatch: 'full'},
      { path : 'presentation', component : PresentationPageComponent},
      { path : 'contact', component : ContactPageComponent},
      { path : 'modification-profil', component : UpdateUserFormComponent},
    ]
  },
  { path : 'recherche-contact', component : SearchContactComponent,canActivate:[AuthGuard],},
  { path : 'notification', component : NotificationPageComponent,canActivate:[AuthGuard],},
  { path: 'chat', component: ChatPageComponent,canActivate:[AuthGuard],},
  { path : 'chat/:id', component : ChatPageComponent,canActivate:[AuthGuard],},
  { path : 'admin', component : AdminMainPageComponent,canActivate:[AuthGuard],
  children:[
    { path : 'users', component : AdminUserComponent},
    { path : 'posts', component : AdminPostComponent},
    { path : 'comments', component : AdminCommentComponent},
    { path : 'messages', component : AdminMessageComponent},
    { path : 'list-messages/:id', component : AdminListMessageComponent},
  ]},
  { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

