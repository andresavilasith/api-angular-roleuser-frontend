import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public current_user: any
  public token: any
  public user_info: any
  public user: User
  public info: any
  public title: any
  public roles_info: any
  public role_user: any

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.current_user = this._userService.getCurrentUser();
    this.token = this._userService.getToken();
    this.title = "Datos de usuario";

    this.user = new User(1, '', '', '', '','')


  }

  ngOnInit(): void {
    this.editUser()
  }

  editUser() {
    this._route.params.subscribe(
      params => {
        this._userService.editUser(params.id, this.token).subscribe(
          result => {
            this._userService.logged(this.current_user)
            this.info = result
            
            this.user = this.info.user
            

            this.roles_info = this.info.roles
            
            this.role_user = this.info.role_user[0]
            
          }
        )
      }
      )
    }
    
    onSubmit(form: any) {
      
      this._userService.updateUser(this.user.id,this.user, this.token).subscribe(
        result => {
        this._router.navigate(['user']);
        
      },
      error => {
        console.log(error);
        this._router.navigate(['user-edit/'+this.user.id]);
        
      }
    );


  }

}
