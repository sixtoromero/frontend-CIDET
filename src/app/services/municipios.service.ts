import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { MunicipioModel } from '../models/municipio.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class MunicipiosService {
    
    endPoint = `${environment.apiURL}/Municipios`;    

    constructor(private _http: HttpClient) { }    

    getMunicipiosById(userId: number): Observable<ResponseModel<MunicipioModel[]>> {        
        return this._http.get<ResponseModel<MunicipioModel[]>>(`${this.endPoint}/GetAsyncByUserId/${userId}` );
    }

    getMunicipiosAll(): Observable<ResponseModel<MunicipioModel[]>> {        
        return this._http.get<ResponseModel<MunicipioModel[]>>(`${this.endPoint}/GetAllAsync` );
    }

    insert(model: MunicipioModel): Observable<ResponseModel<string>> {
        console.log("MunicipioModel", model);
        return this._http.post<ResponseModel<string>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
    }

    update(model: MunicipioModel): Observable<ResponseModel<string>> {
        return this._http.put<ResponseModel<string>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
    }
    
    delete(Id: number): Observable<ResponseModel<string>> {
        return this._http.delete<ResponseModel<string>>(`${this.endPoint}/DeleteAsync/${Id}`);
    }

}