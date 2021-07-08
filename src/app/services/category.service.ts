import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global.service";
import { Observable } from 'rxjs';

@Injectable()

export class CategoryService {
    public url_panel: string;


    constructor(
        private _http: HttpClient
    ) {
        this.url_panel = global.urlApiPanel;
    }

    /* =========== Peticiones al Backend ========= */

    getCategories(token: any, categoryvalue = ''): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/categories', { categoryvalue: categoryvalue }, { headers: headers });
    }

    newCategory(token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/category/create', { headers: headers });
    }

    addCategory(token: any, category: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url_panel + '/category', category, { headers: headers });
    }

    getCategory(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/category/' + id, { headers: headers });
    }

    editCategory(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.get(this.url_panel + '/category/' + id + '/edit', { headers: headers })
    }

    updateRole(id: number, category: any, token: any): Observable<any> {

        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.put(this.url_panel + '/category/' + id, category, { headers: headers });
    }

    deleteCategory(id: number, token: any): Observable<any> {
        var headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete(this.url_panel + '/category/' + id, { headers: headers })

    }


}