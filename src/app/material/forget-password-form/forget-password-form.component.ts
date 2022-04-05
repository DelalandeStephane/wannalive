import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrls: ['./forget-password-form.component.scss']
})
export class ForgetPasswordFormComponent implements OnInit {

  forgetPasswordForm : FormGroup;
  public afterUpdateAction : boolean = false; 
  public afterUpdateActionMessage : string = '';

  constructor(private fb: FormBuilder, private userService : UserService, public dialog: MatDialog) { 
    this.forgetPasswordForm = this.fb.group ({})
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    });
  }

  public forgetPasswordSubmit(){
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    const value = this.forgetPasswordForm.value.email;
    this.userService.forgetPassword(value).subscribe(() => {

    })

    this.userService.forgetPassword(value).subscribe({next: response => {

      this.forgetPasswordForm.reset();
      this.afterUpdateAction = true;
      this.afterUpdateActionMessage = "Un nouveau mot de passe à été envoyé sur votre adresse mail"
      setTimeout(() => {
        this.dialog.closeAll();
      },2000)

    },error :err => {
        if( err.status === 404){
          this.forgetPasswordForm.reset();
          this.afterUpdateAction = true;
          this.afterUpdateActionMessage = "Votre adresse mail n'a été trouvée"
          setTimeout(() => {
            this.dialog.closeAll();
          },2000)
        } else if (err.status === 500) {
            alert('Nous avons rencontré un problème serveur')
        }
      }
    })

    

  }

  

}
