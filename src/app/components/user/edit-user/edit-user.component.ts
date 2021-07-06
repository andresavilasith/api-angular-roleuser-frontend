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

    this.user = new User(1, '', '', '', '', '')


  }

  ngOnInit(): void {
    this.editUser()
  }

  editUser() {
    this._route.params.subscribe(
      params => {
        this._userService.editUser(params.id, this.token).subscribe(
          response => {

            this.modifyCurrentUser(response.user);

            //Todos los roles
            this.roles_info = response.roles

            //Rol asignado al usuario
            this.role_user = response.role_user[0]

          }
        )
      }
    )
  }

  onSubmit(form: any) {

    //Asignacion de role si no hay cambios
    this.user.roles = form.value.roles

    this._userService.updateUser(this.user.id, this.user, this.token).subscribe(
      response => {

        
        this.modifyCurrentUser(response.user);

        this._router.navigate(['user']);


      },
      error => {
        console.log(error);
        this._router.navigate(['user-edit/' + this.user.id]);

      }
    );


  }


  modifyCurrentUser(user:any){
    this.user = user
    if (this.current_user.id == this.user.id) {
      localStorage['currentUser']= JSON.stringify(this.user)
      this.current_user=this.user
      this._userService.logged(this.current_user)
    }
  }

}
