import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public getUserData(): any {
        const userData = sessionStorage.getItem('user');
        if(userData) {
            return JSON.parse(userData);
        } else {
            return 'User Not found'
        }
    }
}
