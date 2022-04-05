import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class profilComponent implements OnInit {

  @ViewChild('headerProfil') headerProfil: any;
  profilId : string = '';
  userId: any;
  userData? :Users;
  authData : any;
  backgroundForm : FormGroup; 
  backgroundPath?: any;
  public contactCount? : number;
  public alreadyOnContact : boolean = false;
  public RequestContactOn : boolean = false;
  public avatarPath: any;
  userStatus : any = localStorage.getItem('auth-status')

  constructor( 
    private userService : UserService,
    private notifService : NotificationService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute
    ) {
    this.backgroundForm = this.fb.group ({});
 
  }

  ngOnInit(): void {



    this.userId = localStorage.getItem('auth-id');
    this.route.params.subscribe( params => 
      {
         this.profilId = params["id"];
         this.authData = { userId : this.userId, profilId : this.profilId}

         this.userService.getUser(this.profilId).subscribe(user => {
          this.userData = user;
         });
    
         this.backgroundForm = this.fb.group ({
          background:['',[Validators.required]],
        });
    
        this.userService.getContactCount(this.profilId).subscribe(count => {
          this.contactCount = count;
        })


        this.userService.getUserBackground(String(this.route.snapshot.params['id'])).subscribe(background => {
          if(background){
            this.backgroundPath = `url("${environment.imgUrl}/background/${background.name}")`;
          } else {
            this.backgroundPath= '';
          }
        })

        this.userService.getUserAvatar(String(this.route.snapshot.params['id'])).subscribe(avatar => {
          if(avatar){
            this.avatarPath = `${environment.imgUrl}/avatar/${avatar.name}`;
          }else {
            this.avatarPath = '../../assets/img/picture/no-photo.png';
          }
        })

        this.userService.getContactList(this.userId).subscribe((userList) => {
          const match = userList.contacts.includes(this.profilId)
          if(match){
             this.alreadyOnContact = true;
          }
     })

     this.userService.getRequestContactList(this.userId).subscribe((contactList) => {
      const match = contactList.request_contact.includes(this.profilId)
      if(match){
         this.RequestContactOn = true;
        }
      })

    });
  }

  public async backgroundSubmit (event :any){
    const backgroundFile = event.target.files[0];
    if (backgroundFile) {
        if(
          backgroundFile.type !== "image/jpeg" &&
          backgroundFile.type !== "image/png" 
          ) 
        {
           this.backgroundForm.get('background')?.setErrors({'mime-type': true});
          return;
        }
        if(backgroundFile.size > 5000000){ // 5mb
           this.backgroundForm.get('background')?.setErrors({'size': true});
          return;
        }
        (await this.userService.uploadBackground(backgroundFile, this.profilId)).subscribe();
        const reader = new FileReader();
        reader.onload =  (event) => {
            this.backgroundPath = event?.target?.result;
            let el = this.headerProfil.nativeElement;
            el.style.backgroundImage=`url(${this.backgroundPath})`;
        }
        reader.readAsDataURL(backgroundFile); 
    }
  }

  public addContact(id:any){

    const data = {
      idApplicant : String(this.authData.userId),
      idRecipient : id,
      type : 'add-contact',
      emitterName: localStorage.getItem('auth-name'),
      targetId : String(this.authData.userId)
   }

   this.notifService.createNotif(data).subscribe(() => {

   })

    this.userService.addRequestContact(id).subscribe(() => {
      this.RequestContactOn = true;
    })

  }
}
