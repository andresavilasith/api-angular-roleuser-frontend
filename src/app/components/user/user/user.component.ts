import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public current_user: any
  public token: any
  public user: any
  public roles: any
  public role_user: any
  public info: any
  public title: any

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.current_user = this._userService.getCurrentUser();
    this.token = this._userService.getToken();
    this.title="Datos de usuario";
  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this._route.params.subscribe(
      params => {

        this._userService.getUser(params.id, this.token).subscribe(
          result => {
            this._userService.logged(this.current_user)
            this.info = result

            this.user = this.info.user
            this.roles = this.info.roles
            this.role_user = this.info.role_user[0]

          },
          error => {
            console.log(error);
            this._router.navigate(['/'])
          }
        );

      }
    )
  }

}
