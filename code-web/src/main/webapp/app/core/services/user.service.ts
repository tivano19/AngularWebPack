import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of, BehaviorSubject, ReplaySubject, timer} from 'rxjs';
import { distinctUntilChanged, delay, concatMap, map, tap  } from 'rxjs/operators';
import { CurrentUser } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    public roles: string[] = ['ROLE_READ', 'ROLE_WRITE', 'ROLE_ACTION'];

    private currentUserSubject = new BehaviorSubject<CurrentUser>({} as CurrentUser);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService
    ) {}


    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('/user')
                .subscribe(
                    data => this.setAuth(data.user),
                    err => this.purgeAuth()
                );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(user: CurrentUser) {
        this.purgeAuth();
        // Save JWT sent from server in localstorage
        this.jwtService.saveCurrentUser(user);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyCurrentUser();
        // Set current user to an empty object
        this.currentUserSubject.next({} as CurrentUser);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    public attemptAuth(username: string, password: string): Observable<CurrentUser> {
        console.log('attemptAuth : ' + username);
        return this.apiService.post('/auth/signin', { username: username, password: password })
          .pipe(map(
            data => {
                console.log('result authentication : ' + JSON.stringify(data));
                this.setAuth(data);
                return data;
            }
          ));
    }


    getCurrentUser(): CurrentUser {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user: CurrentUser): Observable<CurrentUser> {
        return this.apiService
            .put('/user', { user })
            .pipe(map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }


    public getAll() {
        console.log('getAll ... ');
        return this.apiService.get('/users');
    }

    public getDetails(id: number){
        console.log('getDetails ... ');
        return this.apiService.postWithOption('/users/details', {},
            new HttpParams().set('id', `${id}`).set('strparam', 'strparamstrparam'));
    }

    public pollingProcessedIds(id: number): Observable<any> {
        const trigger = this.apiService.postWithOption('/users/processing', {},
            new HttpParams().set('id', `${id}`));

        return timer(0, 2000).pipe(
            concatMap(() => trigger),
            map((response: any) => response),
        );
    }

    public hasAnyRole(role: string): boolean {
        if (this.roles.some((x) => x === role)) {
            return true;
        }
        return false;
    }

    public canApplyAction(actionsPossible: string[], action: any) {
        console.log(actionsPossible + ' {' + action + '}');
        if (!this.hasAnyRole('ROLE_ACTION')) {
           return false;
        }

        if (actionsPossible.some((x) => x === action)) {
            return true;
        }

        return false;
    }
}