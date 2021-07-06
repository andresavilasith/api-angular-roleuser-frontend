import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers:[RoleService]
})
export class RolesComponent implements OnInit {

  public current_user: any;
  public token: any;
  public roles: any

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
  }

  ngOnInit(): void {

    this._roleService.getRoles(this.token).subscribe(
      response=>{
        this._userService.logged(this.current_user)
        this.roles=response.roles.data
       
      },
      error=>{
        console.log(error)
      }
    )
  }


  deleteRole(id:number){
    swal({
      title: "Estas segura/o?",
      text: "Una vez eliminado el rol no se podra recuperar!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._roleService.deleteRole(id, this.token).subscribe(
            response => {
              this.roles = response.roles

              swal("El rol ha sido eliminado correctamente!", {
                icon: "success",
              });
              this._router.navigate(['/role'])

            },
            error => {

              swal("El rol no se ha eliminado");
              this._router.navigate(['/role'])


            }
          )
        }
      });
  }

}
