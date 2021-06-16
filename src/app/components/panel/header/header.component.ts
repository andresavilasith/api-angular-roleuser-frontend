import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { global } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
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
    this._userService.userData(this.token).subscribe(
      result => {
        this.user = result



      },
      error => {
        this._router.navigate(['/login'])
      }
      )
      
      
    }
    
    logout(): void {
      this._userService.logout();
      this._router.navigate(['/login'])
  }

}
