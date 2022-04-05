import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Users } from '../models/users';
import {AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LocalisationService } from '../service/localisation.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

  public userNameLabel?:string ;
  public userSubcategory?: string ;
  public departments: any;
  public userSubcategoryList : string[] = [];

  @ViewChild(MatStepper) stepper!: MatStepper;

  newUserForm : FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private auth : AuthService , 
    private router: Router, 
    private localservice :LocalisationService,
    private userService : UserService
    ) {
    this.newUserForm = this.fb.group ({});
   }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      userCategory:['',[Validators.required]],
      userName:['',[Validators.required,Validators.minLength(2)]],
      userSubcategory:['',Validators.required],
      userDescription:['',Validators.minLength(20)],
      department:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phoneNumber:['', [Validators.minLength(10),Validators.maxLength(10)]],
      website:[],
      password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['',Validators.required],
      facebookLink:[],
      twitterLink:[],
      instagramLink:[],
      youtubeLink:[],
      spotifyLink:[],
      deezerLink:[]
    });

    // list of all departments for select option
    this.localservice.getAllDep().subscribe((deps) => {
      this.departments = deps;
    })

  }

    public goNext(){
    setTimeout(() => {
      if( this.newUserForm.value.userCategory === "artist"){
        this.userNameLabel = "Nom de l'artiste / groupe*";
        this.userSubcategory = "Style musical";
        this.userSubcategoryList = this.userService.getMusicalGenre();
      }
      else {
        this.userNameLabel = "Nom de la salle / festival*";
        this.userSubcategory = "Type d'organisateur*";
        this.userSubcategoryList = this.userService.getOrganizerType();
      }
    },100)
      this.stepper.selected!.completed = true;
      this.stepper.next();
  }

  public goNext2() {
    if(this.newUserForm.value.userName && this.newUserForm.value.userSubcategory) {
      this.stepper.selected!.completed = true;
      this.stepper.next();
    }
    else {
      if(!this.newUserForm.value.userName) {
        this.newUserForm.get('userName')?.markAsTouched();

      }
      if(!this.newUserForm.value.userSubcategory) {
        this.newUserForm.get('userSubcategory')?.markAsTouched();
      }
    }
  }

  public confirmPassword () {
    if(this.newUserForm.value.password !== this.newUserForm.value.confirmPassword){
      this.newUserForm.get('confirmPassword')?.setErrors({'incorrect': true});
    }
  }

   public async confirmEmail() {
     if(this.newUserForm.value.email && this.newUserForm.get('email')?.hasError('email') === false ){
        this.auth.verifyEmail(this.newUserForm.value.email).subscribe((result) => {
            if(result){
              this.newUserForm.get('email')?.setErrors({'already-use': true});
              this.newUserForm.get('email')?.markAsTouched();
            }
        })
     }
  }


   newUserSubmit() {
    // in case email is autocompleted by browser
     this.confirmEmail().then( () => {
        if (this.newUserForm.invalid) {
          return;
        }
          this.newUserForm.value.confirmPassword = undefined;
          const value = this.newUserForm.value as Users;
          // redirect after user creation
           this.auth.signUp(value).subscribe((user) => {
            this.router.navigateByUrl('/');
          });
     });

    
  }

}
