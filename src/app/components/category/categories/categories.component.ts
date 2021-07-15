import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  public current_user: any;
  public token: any;
  public categories: any
  public categoryvalue: any
  public per_page: any;
  public total: any;
  public current_page: number;

  public permissions: any;
  public permissions_slug: any[] = [];

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.current_page = 1;

  }

  ngOnInit(): void {
    this._categoryService.getCategories(this.token, this.categoryvalue).subscribe(
      response => {
        this._userService.logged(this.current_user);
        this.categories = response.categories;
        this.per_page = 7;
        this.total = Object.values(this.categories).length
      
        
        this._userService.userPermissions(this.token).subscribe(
          response => {

            this.permissions=response.permissions;

            this._userService.permissionUser(this.permissions);

            for (let permission of this.permissions) {
              
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



  deleteCategory(id: number) {
    swal({
      title: "Estas segura/o?",
      text: "Una vez eliminado la categoria no se podra recuperar!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._categoryService.deleteCategory(id, this.token).subscribe(
            response => {
              this.categories = response.categories

              swal("La categoria ha sido eliminada correctamente!", {
                icon: "success",
              });
              this._router.navigate(['/category'])

            },
            error => {
              console.log(error);


              swal("La categoria no se ha eliminado");
              this._router.navigate(['/category'])


            }
          )
        }
      });
  }

}
