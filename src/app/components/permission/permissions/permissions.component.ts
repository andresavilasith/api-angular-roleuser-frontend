import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../services/permission.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  providers: [PermissionService]
})
export class PermissionsComponent implements OnInit {

  public current_user: any;
  public token: any;
  public permissions: any;
  public perms: any;
  public permissionvalue: any
  public per_page: any;
  public total: any;
  public current_page: number;
  public permissions_slug: any[] = [];

  constructor(
    private _userService: UserService,
    private _permissionService: PermissionService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.current_page = 1;

  }

  ngOnInit(): void {
    this._permissionService.getPermissions(this.token, this.permissionvalue).subscribe(
      response => {

        this._userService.logged(this.current_user);
        this.permissions = response.permissions;
        this.per_page = 7;
        this.total = Object.values(this.permissions).length;
     
        
        this._userService.userPermissions(this.token).subscribe(
          response => {

            this.perms=response.permissions;

            this._userService.permissionUser(this.perms);

            for (let permission of this.perms) {
              
              this.permissions_slug.push(permission.slug);
            }
           
          },
          error => {
            console.log(error);
            
          }
        );
        

      },
      error => {
        console.log(error);

      }
    );
  }



  deletePermission(id: number) {
    swal({
      title: "Estas segura/o?",
      text: "Una vez eliminado el permiso no se podra recuperar!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._permissionService.deletePermission(id, this.token).subscribe(
            response => {
              this.permissions = response.permissions

              swal("El permiso ha sido eliminado correctamente!", {
                icon: "success",
              });
              this._router.navigate(['/permission'])

            },
            error => {
              console.log(error);


              swal("El permiso no se ha eliminado");
              this._router.navigate(['/permission'])


            }
          )
        }
      });
  }

}
