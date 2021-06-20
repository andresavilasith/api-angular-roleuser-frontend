import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { global } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() loggedIn: any;
  public user: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    
    const headers = new HttpHeaders().set('Authorization', this.token)
    this._http.get(global.urlApiPanel + '/user/identified', { headers: headers }).subscribe(
      result => {
        this.user = result 
      },
      error => {
        this._userService.logout()
        this._router.navigate(['/login'])
      }
    );
    }
    
    logout(): void {
      this._userService.logout();
      
      this._router.navigate(['/login'])
  }

}
