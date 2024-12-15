import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    const isAuthenticated = userService.getUserData();

    if (isAuthenticated === 'User Not found') {
        router.navigate(['/auth/login']);
        return false;
    }

    return true;
};
