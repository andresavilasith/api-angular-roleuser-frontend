import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

  public current_user: any;
  public token: any;
  public status: any;
  public category: Category;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.token = this._userService.getToken();
    this.current_user = this._userService.getCurrentUser();

    this.category = new Category(1, '', '');

  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {

        this._categoryService.getCategory(params.id, this.token).subscribe(
          response => {

            this.category = response.category
            this._userService.logged(this.current_user);

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

}
