import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  public current_user: any
  public token: any
  public info_user: any
  public users: any
  public uservalue: any
  public per_page:any;
  public total:any;
  public current_page:number;


  constructor(
    private _userService: UserService,
    private _router: Router
    ) {

    this.token = this._userService.getToken();
    
    this.current_user = this._userService.getCurrentUser();

    this.current_page=1;


  }

  ngOnInit(): void {

    this._userService.getUsers(this.token,this.uservalue).subscribe(
      response => {
        
        this._userService.logged(this.current_user)
        this.users = response.users
        this.per_page=5;
        this.total = Object.values(this.users).length
        
    
      },
      error => {
        console.log(error);
        this._router.navigate(['/'])

      }
    )

  }

  deleteUser(id: number) {
    swal({
      title: "Estas segura/o?",
      text: "Una vez eliminado el usuario no se podra recuperar!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._userService.deleteUser(id, this.token).subscribe(
            response => {
              this.users = response.users

              swal("El usuario ha sido eliminado correctamente!", {
                icon: "success",
              });
              this._router.navigate(['/user'])

            },
            error => {

              swal("El usuario no se ha eliminado");
              this._router.navigate(['/user'])


            }
          )
        }
      });

  }


}
