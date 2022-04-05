import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../models/users';
import { LocalisationService } from '../service/localisation.service';
import { UserService } from '../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import { UpdatePasswordFormComponent } from '../material/update-password-form/update-password-form.component';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.scss']
})
export class UpdateUserFormComponent implements OnInit  {

  userData? : Users;
  updateForm : FormGroup;
  public userNameLabel?:string ;
  public userSubcategory?: string ;
  public departments: any;
  public userSubcategoryList : string[] = []; 
  public actualUser = String(localStorage.getItem('auth-id'));
  private profilId:string = '';

  constructor(
    private fb: FormBuilder, 
    private userService : UserService, 
    private localService : LocalisationService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
    ) {
    this.updateForm = this.fb.group ({});
   }


  ngOnInit(): void {

    this.route.parent!.params.subscribe( params => 
      {
         this.profilId = params['id'];
         this.userService.getUser(this.profilId).subscribe(user => {
          this.userData = user;
          if( this.userData.userCategory === "Artiste / Groupe"){
            this.userNameLabel = "Nom de l'artiste / groupe*";
            this.userSubcategory = "Style musical";
            this.userSubcategoryList = this.userService.getMusicalGenre();
          }
          else {
            this.userNameLabel = "Nom de la salle / festival*";
            this.userSubcategory = "Type d'organisateur*";
            this.userSubcategoryList = this.userService.getOrganizerType();
          }
          this.updateForm.get('userName')?.setValue(this.userData.userName);
          this.updateForm.get('userSubcategory')?.setValue(this.userData.userSubcategory);
          this.updateForm.get('userDescription')?.setValue(this.userData.userDescription);
          this.updateForm.get('department')?.setValue(this.userData.department);
          this.updateForm.get('phoneNumber')?.setValue(this.userData.phoneNumber);
          this.updateForm.get('website')?.setValue(this.userData.website);
          this.updateForm.get('facebookLink')?.setValue(this.userData.facebookLink);
          this.updateForm.get('twitterLink')?.setValue(this.userData.twitterLink);
          this.updateForm.get('instagramLink')?.setValue(this.userData.instagramLink);
          this.updateForm.get('youtubeLink')?.setValue(this.userData.youtubeLink);
          this.updateForm.get('spotifyLink')?.setValue(this.userData.spotifyLink);
          this.updateForm.get('deezerLink')?.setValue(this.userData.deezerLink);
        })
      });

      this.updateForm = this.fb.group({
        userName:['',[Validators.required,Validators.minLength(2)]],
        userSubcategory:['',Validators.required],
        userDescription:['',Validators.minLength(20)],
        department:['',Validators.required],
        phoneNumber:['', [Validators.minLength(10),Validators.maxLength(10)]],
        website:[],
        facebookLink:[],
        twitterLink:[],
        instagramLink:[],
        youtubeLink:[],
        spotifyLink:[],
        deezerLink:[]
      });
      
      this.localService.getAllDep().subscribe((deps) => {
        this.departments = deps;
      })
 
  }

  public updateUserSubmit(){
    if (this.updateForm.invalid) {
      return;
    }
       this.userService.updateUser( this.updateForm.value,this.userData!._id).subscribe(user => { 
        this.router.navigateByUrl(`/profil/${this.userData!._id}`);
       })
  }

  public showUpdatePassword(){
    this.dialog.open(UpdatePasswordFormComponent,{
      panelClass: 'passwordDialog',
      data : {
        id:this.userData!._id
      } 
    });
  }

}
