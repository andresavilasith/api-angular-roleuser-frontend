import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DomSanitizer } from '@angular/platform-browser';
import { global } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public current_user: any
  public token: any
  public user_info: any
  public user_modified: any
  public user: User
  public title: any
  public preview: any
  public roles_info: any
  public role_user: any
  public files: any = []
  public loading: boolean = false;
  public user_img: any;


  public permissions: any

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer
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
            this._userService.logged(this.current_user);
            this.user = response.user
            
            this.user_img = global.urlApiUserImgPanel+this.user.img;
            //Todos los roles
            this.roles_info = response.roles

            //Rol asignado al usuario
            this.role_user = response.role_user[0]


            this._userService.userPermissions(this.token).subscribe(
              response => {

                this.permissions = response.permissions;

                this._userService.permissionUser(this.permissions);


              },
              error => {
                console.log(error);

              }
            );


          },
          error => {
            console.log(error);

          }
        )
      },
      error => {
        console.log(error);

      }
    )
  }

  extractBase64 = async ($event: any) =>
    new Promise(resolve => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
      } catch (e) {
        return null;
      }
      return $event;
    });



  onSubmit(form: any) {


    //Asignacion de role si no hay cambios
    this.user.roles = form.value.roles


    this._userService.updateUser(this.user.id, this.user, this.token).subscribe(
      response => {
        this.user = response.user
        this.modifyCurrentUser(this.user);

        //
        try {
          this.loading = true;
          const formData = new FormData();
          this.files.forEach((file: any) => {
            formData.append('img', file);
            this.loading = false;

            if (formData) {

              this._userService.uploadUserImg(this.user.id, formData, this.token).subscribe(
                response => {
                  this.user.img = response.data.img
                  this.modifyCurrentUser(this.user);
                },
                error => {
                  console.log(error);

                }
              );
            } 
            
          })

        } catch (error) {
          this.loading = false;
        }
        this._router.navigate(['user']);


      },
      error => {
        console.log(error);
        this._router.navigate(['user-edit/' + this.user.id]);

      }
    );






  }


  modifyCurrentUser(user: any) {
    this.user = user
    if (this.current_user.id == this.user.id) {
      localStorage['currentUser'] = JSON.stringify(this.user)
      this.current_user = this.user
      this._userService.logged(this.current_user)
    }
  }


  getFile(event: any) {
    const imageFile = event.target.files[0];
    this.files.push(imageFile);

    this.extractBase64(imageFile).then((imagen: any) => {
      this.preview = imagen.base;
    });
    this.files.push(imageFile);

  }




}
