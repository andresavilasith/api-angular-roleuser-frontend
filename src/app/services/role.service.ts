import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { global } from "./global.service";

@Injectable()

export class RoleService {

    public url_panel: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url_panel = global.urlApiPanel;
    }

    /* =========== Peticiones al Backend ========= */

    getRoles(token: any, rolevalue = ''): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/roles', { rolevalue: rolevalue }, { headers: headers })
    }

    newRole(token: any) {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/role/create', { headers: headers });

    }

    addRole(token: any, role: any) {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/role', role, { headers: headers })

    }

    getRole(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/role/' + id, { headers: headers })
    }

    editRole(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/role/' + id + '/edit', { headers: headers })
    }

    updateRole(id: number, role: any, token: any): Observable<any> {

        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.put(this.url_panel + '/role/' + id, role, { headers: headers });
    }

    deleteRole(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete(this.url_panel + '/role/' + id, { headers: headers })

    }
}