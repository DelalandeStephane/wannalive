import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {

  updatePasswordForm : FormGroup;
  public afterUpdateAction : boolean = false; 
  constructor(private fb: FormBuilder,
     private userService : UserService, 
     public dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data:any ) {
    this.updatePasswordForm = this.fb.group ({})
   }

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      actualPassword:['',[Validators.required,Validators.minLength(2)]],
      newPassword:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmNewPassword:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  public newPasswordUpdate(){
    if (this.updatePasswordForm.invalid) {
      return;
    }
    const actualPassword = this.updatePasswordForm.value.actualPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    this.userService.verifyPasssword(actualPassword,this.data.id).subscribe({next: response => {
       if(response){  
          this.userService.updatePassword(newPassword,this.data.id).subscribe((response) => {
            if(response){
              this.updatePasswordForm.reset();
              this.afterUpdateAction = true;
              setTimeout(() => {
                this.dialog.closeAll();
              },2000)
              
            }
          })

          
       }
       else {
         this.updatePasswordForm.get('actualPassword')?.markAsTouched();
         this.updatePasswordForm.get('actualPassword')?.setErrors({'password': true});
       }
      }
    })


      //  this.userService.updatePassword( this.updatePasswordForm.value,String(localStorage.getItem('auth-id'))).subscribe(user => { 
      //  })
  }

}
