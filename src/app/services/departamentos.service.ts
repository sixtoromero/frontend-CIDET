import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { DepartamentoModel } from '../models/departamento.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class DepartamentosService {
    
    endPoint = `${environment.apiURL}/Departamentos`;    

    constructor(private _http: HttpClient) { }    

    getDepartamentosAll(): Observable<ResponseModel<DepartamentoModel[]>> {        
        return this._http.get<ResponseModel<DepartamentoModel[]>>(`${this.endPoint}/GetAllAsync` );
    }

}