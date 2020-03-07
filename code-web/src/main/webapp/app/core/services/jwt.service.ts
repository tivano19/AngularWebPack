import { Injectable } from '@angular/core';
import {CurrentUser} from '../models'

@Injectable({ providedIn: 'root' })
export class JwtService {

    public getToken(): String {
        const currentUser:CurrentUser = this.getCurrentUser();

        if (currentUser) {
          return currentUser.token as string;
        }
        return '';
    }

    public getCurrentUser(): CurrentUser {
      return JSON.parse(localStorage.getItem('currentUser') as string) as CurrentUser;
    }

    /**
     * Store user details and jwt token in local storage to keep user logged in between page refreshes
     * @param user
     */
    public saveCurrentUser(user: CurrentUser): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    public destroyCurrentUser(): void {
        localStorage.removeItem('currentUser');
    }

}
