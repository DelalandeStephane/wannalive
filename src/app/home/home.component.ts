import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordFormComponent } from '../material/forget-password-form/forget-password-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public showForgetPassword(){
    this.dialog.open(ForgetPasswordFormComponent,{
      panelClass: 'passwordDialog', 
    });
  }

}
