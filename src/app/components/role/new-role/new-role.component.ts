import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css'],
  providers: [RoleService]
})
export class NewRoleComponent implements OnInit {

  public current_user: any;
  public token: any;
  public categories_all: any;
  public categories: any;
  public position_tab: number;
  public role: Role;
  public selected_perm: any[] = [];


  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.position_tab = -2;
    this.role = new Role(1, '', '', '', '', '');
    this.getPositionTab(-1);
  }

  ngOnInit(): void {
    this._roleService.newRole(this.token).subscribe(
      response => {
        this._userService.logged(this.current_user);
        this.categories_all = response
        this.categories = this.categories_all.categories
      },
      error => {
        console.log(error);
      }
    );
  }

  getPositionTab(position: number) {
    this.position_tab = position

  }

  onSubmit(form: any) {
    
    this.role.permissions = this.selected_perm

    this._roleService.addRole(this.token,this.role).subscribe(
      response=>{
        this._router.navigate(['role']);
        
      },
      error=>{
        console.log(error);
        
      }
    );
    

  }

  eventCheck(event: any) {
    if (event.checked) {
      //Anadir items al array de checkbox
      this.selected_perm.push(event.value)

    } else {
      this.removeItemFromArr(this.selected_perm, event.value);

    }

  }

  //Remover items de checkbox si se desmarcan
  removeItemFromArr(arr_permissions: any, perm: any) {
    let i = arr_permissions.indexOf(perm);

    if (i !== -1) {
      arr_permissions.splice(i, 1);
    }
  }

}
