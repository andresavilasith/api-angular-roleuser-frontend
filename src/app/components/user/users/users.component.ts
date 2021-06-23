import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public current_user: any
  public token: any
  public info: any
  public users: any
  constructor(
    private _userService: UserService,
    private _router:Router
  ) {
    this.current_user = this._userService.getCurrentUser();

    this.token = this._userService.getToken();

  }

  ngOnInit(): void {

    this._userService.getUsers(this.token).subscribe(
      result => {
        this._userService.logged(this.current_user)
        this.info = result
        this.users=this.info.users.data
        
      },
      error => {
        console.log(error);
        this._router.navigate(['/'])

      }
    )

  }

}
