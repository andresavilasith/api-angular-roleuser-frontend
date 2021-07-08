import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [CategoryService]
})
export class EditCategoryComponent implements OnInit {

  public current_user: any;
  public token: any;
  public status: any;
  public categories: any;
  public category: Category;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.category = new Category(0, '', '');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {

        this._categoryService.editCategory(params.id, this.token).subscribe(
          response => {
            this._userService.logged(this.current_user);
            this.category = response.category

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

  onSubmit(form: any) {
    this._categoryService.updateRole(this.category.id, this.category, this.token).subscribe(
      response => {
        this.status=response.status
        
        if(this.status=='success'){
          this._router.navigate(['category']);
        }
        

      },
      error => {
        console.log(error);
      }
    );
  }

}
