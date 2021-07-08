import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../../models/permission';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
  providers: [PermissionService]
})
export class PermissionComponent implements OnInit {

  public token: any;
  public categories: any;
  public current_user: any;
  public permission: Permission;

  constructor(
    private _userService: UserService,
    private _permissionService: PermissionService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.permission = new Permission(1, 1, '', '', '');

  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {
        this._permissionService.getPermission(params.id, this.token).subscribe(
          response => {
            this._userService.logged(this.current_user);

            this.categories = response.categories;

            this.permission = response.permission

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

}
