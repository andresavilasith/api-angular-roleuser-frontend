import { Component, OnInit } from '@angular/core';
import { Permission } from '../../../models/permission';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css'],
  providers: [PermissionService]
})
export class EditPermissionComponent implements OnInit {

  public current_user: any
  public token: any
  public status: any
  public categories: any
  public permission: Permission


  public permissions: any

  constructor(
    private _userService: UserService,
    private _permissionService: PermissionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.current_user = this._userService.getCurrentUser();
    this.token = this._userService.getToken();

    this.permission = new Permission(1, 1, '', '', '')
  }

  ngOnInit(): void {
    this.editPermission();
  }

  editPermission() {
    this._route.params.subscribe(
      params => {
        this._permissionService.editPermission(params.id, this.token).subscribe(
          response => {
            this.categories = response.categories;
            this.permission = response.permission;

            

            this._userService.logged(this.current_user);
            this._userService.userPermissions(this.token).subscribe(
              response => {

                this.permissions = response.permissions;

                this._userService.permissionUser(this.permissions);


              },
              error => {
                console.log(error);

              }
            );
          },
          error => {
            console.log(error);
            this._router.navigate(['permission']);

          }
        );
      },
      error => {
        console.log(error);

      }
    );
  }

  onSubmit(form:any){
    this._permissionService.updatePermission(this.permission.id,this.permission,this.token).subscribe(
      response=>{
        this.status=response.status
        if(this.status=='success'){
          this._router.navigate(['permission']);
        }
        
      },
      error=>{
        console.log(error);
        
      }
    );
  }

}
