import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  public fileName = '';
  public file:any;
  @Input() authData : any;
  @Input() avatarPath : any;
  avatarForm : FormGroup; 
  userStatus : any = localStorage.getItem('auth-status')

  constructor(private userService: UserService, private fb: FormBuilder) { 
    this.avatarForm = this.fb.group ({});
  }

  ngOnInit(): void {
    this.avatarForm = this.fb.group ({
      avatar:['',[Validators.required]],
    });

  }

  public async avatarSubmit(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
        if(
          this.file.type !== "image/jpeg" &&
          this.file.type !== "image/png" 
          ) 
        {
          this.avatarForm.get('avatar')?.setErrors({'mime-type': true});
          return;
        }
        if(this.file.size > 2000000){ // 2mb
          this.avatarForm.get('avatar')?.setErrors({'size': true});
          return;
        }
        (await this.userService.uploadAvatar(this.file, this.authData.profilId)).subscribe();
        const reader = new FileReader();
        reader.onload =  (event) => {
            this.avatarPath = event?.target?.result;
        }
        reader.readAsDataURL(this.file);
    }
}

}
