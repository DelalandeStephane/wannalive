import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent implements OnInit {
  public showFiller = false;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public logout(){
      this.authService.logOut();
  }
}
