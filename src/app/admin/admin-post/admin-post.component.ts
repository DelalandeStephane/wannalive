import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteElementComponent } from 'src/app/material/dialog-delete-element/dialog-delete-element.component';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss']
})
export class AdminPostComponent implements OnInit {
  public postList : any;
  displayedColumns: string[] = ['ID', 'userId', 'post','action'];

  constructor(private adminService : AdminService,private router: Router,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.adminService.getAllPosts().subscribe((postList) => {

      postList.forEach((post:any) => {
        post.deleteAction = false;
    });
      this.postList = postList;
   })

  }

  public seePost(post:any){
    this.router.navigate([`/profil/${post.userID}`],{ fragment: `p-${post._id}` });
  }
  public deletePost(post:any){
    const deleteAction = this.dialog.open(DialogDeleteElementComponent);
    deleteAction.afterClosed().subscribe(confirm => {
      if ( confirm === true){
        this.adminService.deletePost(post._id).subscribe(() => {
            post.deleteAction = true;
        })
      }
    })
  }

}
