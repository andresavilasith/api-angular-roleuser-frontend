import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { global } from "./global.service";
import { Router } from '@angular/router';

@Injectable()

export class UserService {
    public url_auth: string;
    public url_auth_token: string;
    public token: any;
    public user: any;
    public user_storage: any;

    public loggedChanged = new Subject<boolean>();
    public currentUser = new Subject<any>();
    public message: any;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {

        this.url_auth = global.urlAuth;
        this.url_auth_token = global.urlAuthToken;
    }

    
    /* =========== Peticiones al Backend ========= */
    
    userData(token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(global.urlApiPanel + '/user/identified', { headers: headers })
    }
    
    
    getUsers(token:any){
        var headers = new HttpHeaders().set('Authorization', token)
    
        return this._http.get(global.urlApiPanel + '/user', { headers: headers })
        
    }

    
    /* =========== Autenticacion ============ */
    register(user: any): Observable<any> {
        return this._http.post(this.url_auth + '/register', user);
    }

    signup(user: any): Observable<any> {
        return this._http.post(this.url_auth_token, user);
    }

    
    isUserCurrent(): Subject<any> {
        return this.currentUser;
    }


    
    getToken() {
        this.token = 'Bearer ' + localStorage.getItem('token');
        return this.token;
    }

    logged(user:any): void {
        this.loggedChanged.next(true);
        this.currentUser.next(user);
    }


    getCurrentUser(){
        this.user_storage= localStorage.getItem('currentUser');

        return JSON.parse(this.user_storage)
    }


    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        return this.loggedChanged.next(false);
    }

    isUserLogged(): Subject<boolean> {
        return this.loggedChanged;
    }

    setMessage(message: any) {
        sessionStorage.setItem('message', message);
    }

    getMessage() {
        this.message = sessionStorage.getItem('message')
        return this.message

    }

}