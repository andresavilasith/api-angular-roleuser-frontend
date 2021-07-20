import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { global } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() loggedIn: any;
  @Input() user: any;
  @Input() token: any;
  @Input() permissions_slug: any;
  public user_img:string;
  public resolution:number;
  public status_menu:boolean;
  

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
   
      this.user_img=global.urlApiUserImgPanel;
    
    this.resolution=window.innerWidth
    this.status_menu=false;
  }

  ngOnInit(): void {
    
  }

  //Evento similar a addEventListener de JS 
  //Obtener resolucion de pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.resolution = window.innerWidth; 
  }

  logout(): void {
    this._userService.logout();

    this._router.navigate(['/login'])
  }

  statusMenu(){
    if(this.status_menu || this.resolution >1200){
      this.status_menu=false;
    }else{
      
      this.status_menu=true;
    }

    
  }

}
