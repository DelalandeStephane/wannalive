import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.scss']
})
export class AsideBarComponent implements OnInit {
  public userId : string = '';
  @Input() userList:any[] = [] ;
  
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userId = String(localStorage.getItem('auth-id'));

  }

  logOut(){
    this.authService.logOut()
  }

}
