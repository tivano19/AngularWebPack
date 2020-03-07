import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtService} from "../services/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor( private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = this.jwtService.getToken();

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }
}
