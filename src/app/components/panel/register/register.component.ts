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
  public error_message: any;
  public error_email: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.page_title = 'User Register'
    this.user = new User(1, '', '', '', '', 2);
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      result => {
        this._userService.setMessage(result.message)
        this._router.navigate(['/login']);

      },
      err => {
        console.log(err);
        this.error_message=err.error.message
        console.log(this.error_message);
        this.error_email=err.error.errors.email[0]
        console.log(this.error_email);
      }
    )
  }

}
