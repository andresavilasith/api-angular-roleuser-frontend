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
  public rolevalue: any
  public per_page: any;
  public total: any;
  public current_page: number;

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.current_page = 1;

  }

  ngOnInit(): void {

    this._roleService.getRoles(this.token,this.rolevalue).subscribe(
      response=>{
        this._userService.logged(this.current_user)
        this.roles=response.roles
        this.per_page = 7;
        this.total = Object.values(this.roles).length
      
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

              console.log(error);
              
              swal("El rol no se ha eliminado");
              this._router.navigate(['/role'])


            }
          )
        }
      });
  }

}
