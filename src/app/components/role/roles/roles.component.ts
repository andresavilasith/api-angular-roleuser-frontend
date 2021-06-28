import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public current_user: any;
  public token: any;
  public roles: any

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser()
  }

  ngOnInit(): void {
  }

}
