import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Cargar modulos y servicios de las rutas
import { routing, appRoutingProviders } from './app.routing';

//Paginacion
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/panel/header/header.component';
import { FooterComponent } from './components/panel/footer/footer.component';
import { RegisterComponent } from './components/panel/register/register.component';
import { LoginComponent } from './components/panel/login/login.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserComponent } from './components/user/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { RolesComponent } from './components/role/roles/roles.component';
import { RoleComponent } from './components/role/role/role.component';
import { NewRoleComponent } from './components/role/new-role/new-role.component';
import { EditRoleComponent } from './components/role/edit-role/edit-role.component';
import { PermissionsComponent } from './components/permission/permissions/permissions.component';
import { PermissionComponent } from './components/permission/permission/permission.component';
import { NewPermissionComponent } from './components/permission/new-permission/new-permission.component';
import { EditPermissionComponent } from './components/permission/edit-permission/edit-permission.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { CategoryComponent } from './components/category/category/category.component';
import { NewCategoryComponent } from './components/category/new-category/new-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { UserService } from './services/user.service';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/panel/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    EditUserComponent,
    RolesComponent,
    RoleComponent,
    NewRoleComponent,
    EditRoleComponent,
    PermissionsComponent,
    PermissionComponent,
    NewPermissionComponent,
    EditPermissionComponent,
    CategoriesComponent,
    CategoryComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing, 
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
