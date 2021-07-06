import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [RoleService]
})
export class EditRoleComponent implements OnInit {

  public current_user: any;
  public token: any;
  public categories: any;
  public position_tab: number;
  public role: Role;
  public selected_perm: any[] = [];
  public permission_role: any[] = [];
  public category_permission: any[] = [];

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.position_tab = -2;
    this.role = new Role(1, '', '', '', '', '');
    this.getPositionTab(-1);
  }

  ngOnInit(): void {


    this._route.params.subscribe(
      params => {
        this._roleService.editRole(params.id, this.token).subscribe(
          response => {
            console.log(response);


            this._userService.logged(this.current_user);
            this.categories = response.categories;
            this.role = response.role;
            this.permission_role = response.permission_role;
            this.category_permission = response.category_permission



            this.selected_perm = this.permission_role


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
    if (this.role.full_access == 'yes') {
      for (let cat of this.categories) {

        for (let perm of cat.permissions) {
          this.selected_perm.push(perm.id);
        }
      }
      this.role.permissions = this.selected_perm
    }

    this.role.permissions = this.selected_perm
    this._roleService.updateRole(this.role.id, this.role, this.token).subscribe(
      response => {
        this.role = response.role
        this.role.permissions = response.permissions
        this._router.navigate(['role']);

      },
      error => {
        console.log(error);

      }
    );
  }

  getPositionTab(position: number) {
    this.position_tab = position

  }


  eventCheck(event: any) {
    let perm_value = parseInt(event.value)
    if (event.checked) {

      //Anadir items al array de checkbox
      if (!this.selected_perm.includes(perm_value)) {

        this.selected_perm.push(perm_value)
      }




    } else {

      this.removeItemFromArr(this.selected_perm, perm_value);

    }


    console.log(this.selected_perm);


  }

  //Remover items de checkbox si se desmarcan
  removeItemFromArr(arr_permissions: any, perm: any) {
    let i = arr_permissions.indexOf(perm);

    if (i !== -1) {
      arr_permissions.splice(i, 1);
    }
  }

}
