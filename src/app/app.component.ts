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
  public token: any;
  public user: any;


  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this._userService.isUserLogged().subscribe(
      result => {
        this.loggedIn = result
        this._userService.isUserCurrent().subscribe(
        result=>{
          this.user=result
          
        },
        error=>{
          console.log(error);
          
        }
      )
      }
      , error => {
        console.log(error);
        this._router.navigate(['/login'])

      })


      
  }
}
