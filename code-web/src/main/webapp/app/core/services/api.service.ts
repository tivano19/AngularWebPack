import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError as observableThrowError} from 'rxjs';

import { JwtService } from './jwt.service';
import { LoggerService } from './loggerService';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private apiUrl: string = '/myapp';

    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) {}


    public get(path: string): Observable<any> {
        LoggerService.log(`${this.apiUrl}${path}`);
        return this.getByParam(path, new HttpParams());
    }

    public getByParam(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        LoggerService.log(`${this.apiUrl}${path}`);
        return this.http.get<any>(`${this.apiUrl}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    public put(path: string, body: object = {}): Observable<any> {
        LoggerService.log(`${this.apiUrl}${path}` + JSON.stringify(body));
        return this.http.put(
            `${this.apiUrl}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    public post(path: string, body: object = {}): Observable<any> {
        LoggerService.log(`${this.apiUrl}${path}` + JSON.stringify(body));
        return this.http.post(
            `${this.apiUrl}${path}`, body
        ).pipe(catchError(this.formatErrors));
    }

    public postWithOption(path: string, body?: any, params?: HttpParams, headers?: HttpHeaders): Observable<any> {

        let options: any =  {
            headers: headers,
            params: params
        }

        return this.http.post(
            `${this.apiUrl}${path}`, body, options
        ).pipe(catchError(this.formatErrors));
    }


    public delete(path: string): Observable<any> {
        LoggerService.log(`${this.apiUrl}${path}`);
        return this.http.delete(
            `${this.apiUrl}${path}`
        ).pipe(catchError(this.formatErrors));
    }

    private formatErrors(error: any) {
        return  throwError(error.error);
    }

    private handleError(res: HttpErrorResponse | any) {
        console.error(res.error || res.body.error);
        return observableThrowError(res.error || 'Server error');
    }
}
