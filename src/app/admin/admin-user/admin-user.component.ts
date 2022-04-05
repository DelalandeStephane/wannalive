import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  public userList:any;
  displayedColumns: string[] = ['ID', 'name', 'category', 'subcategory','email','action'];
  constructor(private adminService : AdminService, private router: Router,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((userList) => {
      userList.forEach((user:any) => {
          user.deleteAction = false;
      });
        this.userList = userList;
    })
  }

  public seeProfil(id:string){
    this.router.navigateByUrl(`/profil/${id}`);
  }

  public deleteProfil(element:any){

    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){

        this.adminService.deleteUser(element._id).subscribe(() => {
            element.deleteAction = true;
        })
      }
    })
  }

}
