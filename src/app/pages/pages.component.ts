import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IRoute } from '../types/types';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule
    ],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.scss'
})
export class PagesComponent {
    private router = inject(Router);

    private userService = inject(UserService);

    private apiService = inject(ApiService);

    private _snackBar = inject(MatSnackBar);

    public activeMenuLink: String = '';

    public selectedRoute: IRoute = {} as IRoute;

    public openSideNav: boolean = true;

    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';

    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    public user: any;

    public menus = [
        {
            title: 'Menu',
            active: false,
            links: [
                {
                    icon: 'dashboard',
                    menuTitle: 'Dashboard',
                    route: '/dashboard'
                },
                {
                    icon: 'edit_note',
                    menuTitle: 'Income / Expense Form',
                    route: '/dashboard/form'
                },
                {
                    icon: 'dataset',
                    menuTitle: 'Income / Expense Data',
                    route: '/dashboard/data'
                },
                {
                    icon: 'edit_note',
                    menuTitle: 'Opening Information',
                    route: '/dashboard/openings',
                }
            ]
        },
        {
            title: 'Others',
            active: false,
            links: [
                {
                    icon: 'settings',
                    menuTitle: 'Settings',
                    route: '/dashboard'
                },
                {
                    icon: 'manage_accounts',
                    menuTitle: 'Account',
                    route: '/dashboard'
                },
                {
                    icon: 'info',
                    menuTitle: 'Help',
                    route: '/dashboard'
                },
                {
                    icon: 'logout',
                    menuTitle: 'Logout',
                    route: '/auth/login'
                }
            ]
        }
    ];

    constructor() {
        this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd) {
                console.log(val.url);
            }
        });

        this.getUserDetails();
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    public handleSelectedRoute(route: IRoute): void {
        this.selectedRoute = route;
        if(route.menuTitle === 'Logout') {
            sessionStorage.removeItem('user');
            this.apiService.handleLogoutService(this.user).subscribe({
                next: (response) => {
                    this.openSnackBar(response.message);
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {
                    console.log('complete');
                }
            })

        }
        this.router.navigate([route.route])
    }

    public handleRefresh() {
        window.location.reload();
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
        });
    }
}
