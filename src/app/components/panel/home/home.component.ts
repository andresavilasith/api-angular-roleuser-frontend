import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any;
  public token: any;
  public permissions: any;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {


    this._userService.userData(this.token).subscribe(
      resultUser => {
        this.user = resultUser


        localStorage.setItem('currentUser', JSON.stringify(resultUser));


        this._userService.logged(this._userService.getCurrentUser());

        this._userService.userPermissions(this.token).subscribe(
          response => {
            this.permissions = response.permissions
            
            this._userService.permissionUser(this.permissions);
          },
          error => {
            console.log(error);

          }
        );

      },
      error => {
        this._router.navigate(['/login'])

      }
    );



  }



}
