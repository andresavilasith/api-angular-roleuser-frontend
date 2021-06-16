import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'roleuserfrontend';
  public loggedIn: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this._userService.isUserLogged().subscribe(
      result => {

        this.loggedIn = result

        
      }
      , error => {
        console.log(error);

      })



  }
}
