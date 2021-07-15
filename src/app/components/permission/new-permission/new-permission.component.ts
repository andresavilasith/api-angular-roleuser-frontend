import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';
import { Permission } from '../../../models/permission';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-permission',
  templateUrl: './new-permission.component.html',
  styleUrls: ['./new-permission.component.css'],
  providers: [PermissionService]
})
export class NewPermissionComponent implements OnInit {

  public token: any;
  public status: any;
  public current_user: any;
  public categories: any;
  public permissions: any;
  public permission: Permission;

  constructor(
    private _userService: UserService,
    private _permissionService: PermissionService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.permission = new Permission(0, 1, '', '', '');

  }

  ngOnInit(): void {
    this._permissionService.newPermission(this.token).subscribe(
      response => {

        this._userService.logged(this.current_user);
        this.categories = response.categories

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

      }
    );
  }

  onSubmit(form: any) {
    this._permissionService.addPermission(this.token, this.permission).subscribe(
      response => {
        this.status = response.status
        if (this.status == 'success') {
          this._router.navigate(['permission']);
        }

      },
      error => {
        console.log(error);

      }
    );
  }

}
