import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  public contacts : any;
  public state = 'contact-user';
  public profilId :string = '' ;
  public userId :string = '' ;
  public authData : any;
  constructor(private userService : UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profilId = this.route.snapshot.parent?.params['id'];
    this.userId = String(localStorage.getItem('auth-id'));
    this.authData = { userId: this.userId, profilId : this.profilId}
    this.userService.getContactFromList(String(this.profilId)).subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  // only if is the user profil
  public updateListContact(){
    this.userService.getContactFromList(String(this.profilId)).subscribe(contacts => {
      this.contacts = contacts;
    })
  }

}
