import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public message: any;
  public user: User;
  public user_data: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.user = new User(1, '', '', '', '',2)

  }

  ngOnInit(): void {

    this.message = this._userService.getMessage()
  }

  ngOnDestroy(): void {
    sessionStorage.clear()
  }

  onSubmit(form: any) {
    this.user_data = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'i956VdKucGoWROB3c5l8Tw0Ism5v48MFakr0rnhL',
      scope: '*',
      username: this.user.email,
      password: this.user.password
    }

    this._userService.signup(this.user_data).subscribe(
      result => {
        localStorage.setItem('token',result.access_token);
        
        this._router.navigate(['/'])
        
      },
      error => {
        this._router.navigate(['/login'])
        this._userService.logout();
        console.log(error);

      }
    )

  }



}
