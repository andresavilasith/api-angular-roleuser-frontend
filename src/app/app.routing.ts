//Importar dependencias necesarias
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './components/panel/login/login.component';
import { RegisterComponent } from './components/panel/register/register.component';
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
import { HomeComponent } from './components/panel/home/home.component';

//Componentes


const appRoutes: Routes=[

    {path: '',component: HomeComponent},
    {path: 'home',component: HomeComponent},

    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    
    //User
    {path: 'user',component: UsersComponent},
    {path: 'user/:id',component: UserComponent},
    {path: 'user-edit/:id',component: EditUserComponent},
    
    //Role
    {path: 'role',component: RolesComponent},
    {path: 'role/:id',component: RoleComponent},
    {path: 'role-new',component: NewRoleComponent},
    {path: 'role-edit/:id',component: EditRoleComponent},

    //Category
    {path: 'category', component:CategoriesComponent},
    {path: 'category/:id', component:CategoryComponent},
    {path: 'category-new', component:NewCategoryComponent},
    {path: 'category-edit/:id', component:EditCategoryComponent},
    
    //Permission
    {path: 'permission',component: PermissionsComponent},
    {path: 'permission/:id',component: PermissionComponent},
    {path: 'permission-new',component: NewPermissionComponent},
    {path: 'permission-edit/:id',component: EditPermissionComponent},


];

//Exportar la configuracion
export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);