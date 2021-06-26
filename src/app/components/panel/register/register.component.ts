import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public page_title: string;

  constructor(
    private _userService: UserService,
    private _router:Router
  ) {
    this.page_title = 'User Register'
    this.user = new User(1, '', '', '', '',2);
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      result => {
        this._userService.setMessage(result.message)
        this._router.navigate(['/login']);

      },
      error => {
        console.log(error);

      }
    )
  }

}
