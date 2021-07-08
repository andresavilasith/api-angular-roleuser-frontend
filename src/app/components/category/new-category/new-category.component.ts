import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
  providers: [CategoryService]
})
export class NewCategoryComponent implements OnInit {

  public current_user: any;
  public token: any;
  public status: any;
  public category: Category;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();
    this.category = new Category(0, '', '');
  }

  ngOnInit(): void {
    this._categoryService.newCategory(this.token).subscribe(
      response => {
        this.status = response.status
        if (this.status == 'success') {
          this._userService.logged(this.current_user);
        }
      },
      error => {

        console.log(error);

      }
    );
  }

  onSubmit(form:any){
    this._categoryService.addCategory(this.token,this.category).subscribe(
      response=>{
        this._router.navigate(['category']);
      },
      error=>{
        console.log(error);
        
      }
    );
  }
}
