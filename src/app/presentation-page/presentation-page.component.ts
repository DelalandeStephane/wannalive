import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent implements OnInit {
  profilId : string = '';
  userData : any;
  constructor(private userService : UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profilId = this.route.snapshot.parent?.params['id'];
     this.userService.getUser(String(this.profilId)).subscribe((user) => {
       this.userData =user;
     })
  
  }

}
