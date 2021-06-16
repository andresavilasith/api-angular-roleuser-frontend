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

    public loggedChanged = new Subject<boolean>();
    public message: any;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {

        this.url_auth = global.urlAuth;
        this.url_auth_token = global.urlAuthToken;
    }

    register(user: any): Observable<any> {
        return this._http.post(this.url_auth + '/register', user);
    }

    signup(user: any): Observable<any> {
        return this._http.post(this.url_auth_token, user);
    }

    login(token:any){
        localStorage.setItem('token',token);
        this.loggedChanged.next(true);
        
    }

    getToken() {
        this.token = 'Bearer ' + localStorage.getItem('token');
        return this.token;
    }

    logout() {
        this.loggedChanged.next(false);
        localStorage.removeItem('token');
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


    userData(token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(global.urlApiPanel + '/user/identified', { headers: headers })
    }


}