import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { global } from "./global.service";

@Injectable()

export class UserService {
    public url_auth: string;
    public url_auth_token: string;
    public url_panel: string;
    public token: any;
    public user: any;
    public user_storage: any;

    public loggedChanged = new Subject<boolean>();
    public currentUser = new Subject<any>();
    public message: any;

    constructor(
        private _http: HttpClient
    ) {

        this.url_auth = global.urlAuth;
        this.url_auth_token = global.urlAuthToken;
        this.url_panel = global.urlApiPanel;
    }


    /* =========== Peticiones al Backend ========= */

    userData(token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(this.url_panel + '/user/identified', { headers: headers })
    }


    getUsers(token: any) :Observable<any>{
        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(this.url_panel + '/user', { headers: headers })

    }

    getUser(id: number, token: any) :Observable<any>{
        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(this.url_panel + '/user/' + id, { headers: headers });
    }


    editUser(id: number, token: any) :Observable<any>{

        var headers = new HttpHeaders().set('Authorization', token)

        return this._http.get(this.url_panel + '/user/' + id + '/edit', { headers: headers });
    }

    updateUser(id: number, user: any, token: any): Observable<any> {

        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.put(this.url_panel + '/user/' + id, user, { headers: headers });
    }

    deleteUser(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete(this.url_panel + '/user/' + id, { headers: headers })

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

    logged(user: any): void {
        this.loggedChanged.next(true);
        this.currentUser.next(user);
    }


    getCurrentUser() {
        this.user_storage = localStorage.getItem('currentUser');

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

    setMessage(message: any){
        sessionStorage.setItem('message', message);
    }

    getMessage() {
        this.message = sessionStorage.getItem('message')
        return this.message

    }

}