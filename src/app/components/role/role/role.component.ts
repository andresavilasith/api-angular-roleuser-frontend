import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [RoleService]
})
export class RoleComponent implements OnInit {

  public current_user: any
  public token: any
  public user: any
  public categories_all: any;
  public categories: any;
  public permissions: any;
  public category_permission: any;
  public position_tab: number;
  public role: Role;
  public selected_perm: any[] = [];


  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.position_tab = -2;
    this.role = new Role(1, '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getRole();
    this.getPositionTab(-1);
  }

  getRole() {
    this._route.params.subscribe(
      params => {
        this._roleService.getRole(params.id, this.token).subscribe(
          response => {
            this._userService.logged(this.current_user)
            this.categories_all = response
            this.categories = this.categories_all.categories
            this.role = response.role;

            this.category_permission = response.category_permission

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
      },
      error => {
        console.log(error);

      }
    );
  }


  getPositionTab(position: number) {
    this.position_tab = position

  }



}
