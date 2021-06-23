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
  @Input() user: any;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    
  }

  ngOnInit(): void {


  }

  logout(): void {
    this._userService.logout();

    this._router.navigate(['/login'])
  }

}
