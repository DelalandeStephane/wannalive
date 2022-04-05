
import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { LocalisationService } from '../service/localisation.service';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.scss']
})
export class SearchContactComponent implements OnInit {
  public users? : [Users];
  public regions : any;
  public departments : any;
  public searchUserForm : FormGroup;
  public showSubcategory = false;
  public subcategories?: string[];
  public state = "contact-search";
  public requestContactList? : [];
  constructor(
    private userService : UserService, 
    private localService : LocalisationService,
    private fb: FormBuilder
    ) { 
      this.searchUserForm = this.fb.group ({});
    }

  ngOnInit(): void {

    this.userService.getRequestContactList(String(localStorage.getItem('auth-id'))).subscribe(contactList => {
      this.requestContactList = contactList;
    })

      this.userService.getAllUser().subscribe(users => {
         this.users = users;

      })

      this.localService.getAllRegions().subscribe(regions => {
        this.regions = regions;
     })

     this.localService.getAllDep().subscribe(departments => {
      this.departments = departments;
   })

   this.searchUserForm = this.fb.group({
    region:[],
    department:[],
    category:[],
    subcategory:[],
    username:[]
  });

  }

  public changeRegion(event : any){
    let region;
    if(event.target.value){
      region = event.target.value;
    }
     this.userService.getAllUser(this.searchUserForm.value).subscribe(users => {
        this.users = users;
      });

      this.localService.getAllDep(region).subscribe(departments => {
        this.departments = departments;
      })
  }

  public changeDep(event : any){
    if(event.target.value){
      const dep = event.target.value.split('-')[0];
      const region = this.departments.find((el : any) => el.num_dep == dep).region_name
      this.searchUserForm.get('region')?.setValue(region);
    } 
    this.userService.getAllUser(this.searchUserForm.value).subscribe(users => {
      this.users = users;
    });
  }

  public changeCategory(event :any){
    if(event.target.value){
      this.showSubcategory = true;
      if(event.target.value === 'artist'){
        this.subcategories = this.userService.getMusicalGenre();
      } else {
        this.subcategories = this.userService.getOrganizerType();
      }
    }else {
      this.showSubcategory= false;
      this.searchUserForm.get('subcategory')?.reset();
    }
    this.userService.getAllUser(this.searchUserForm.value).subscribe(users => {
      this.users = users;
    });
  }

  public changeSubcategory(){
    this.userService.getAllUser(this.searchUserForm.value).subscribe(users => {
      this.users = users;
    });
  }

  public changeUserName(event :any){
    if(event.target.value[0] != ' '){
      this.userService.getAllUser(this.searchUserForm.value).subscribe(users => {
        this.users = users;
      });
    }

  }
}
