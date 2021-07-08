import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global.service";
import { Observable } from 'rxjs';

@Injectable()

export class PermissionService {
    public url_panel: string;


    constructor(
        private _http: HttpClient
    ) {
        this.url_panel = global.urlApiPanel;
    }

    /* =========== Peticiones al Backend ========= */

    getPermissions(token: any,permissionvalue=''): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/permissions', { permissionvalue: permissionvalue }, { headers: headers });
    }

    newPermission(token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/permission/create', { headers: headers });
    }

    addPermission(token: any, permission: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/permission', permission, { headers: headers });
    }

    getPermission(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/permission/' + id, { headers: headers });
    }

    editPermission(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/permission/' + id + '/edit', { headers: headers })
    }

    updatePermission(id: number, category: any, token: any): Observable<any> {

        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.put(this.url_panel + '/permission/' + id, category, { headers: headers });
    }

    deletePermission(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete(this.url_panel + '/permission/' + id, { headers: headers })

    }


}