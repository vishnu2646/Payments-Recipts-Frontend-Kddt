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
import { DeviceDetectorService } from 'ngx-device-detector';

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

    private deviceService = inject(DeviceDetectorService);

    public activeMenuLink: String = '';

    public selectedRoute: IRoute = {} as IRoute;

    public openSideNav: boolean = true;

    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';

    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    private activeUrl: string = '';

    public user: any;

    public isOpenSideNav: boolean = false;

    public menus = [
        {
            title: 'Menu',
            links: [
                {
                    icon: 'dashboard',
                    menuTitle: 'Dashboard',
                    route: '/dashboard',
                    active: false,
                },
                {
                    icon: 'edit_note',
                    menuTitle: 'Income / Expense Form',
                    route: '/dashboard/form',
                    active: false,
                },
                {
                    icon: 'dataset',
                    menuTitle: 'Income / Expense Data',
                    route: '/dashboard/data',
                    active: false,
                },
                {
                    icon: 'edit_note',
                    menuTitle: 'Opening Information',
                    route: '/dashboard/openings',
                    active: false,
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
                    route: '/dashboard',
                    active: false,
                },
                {
                    icon: 'manage_accounts',
                    menuTitle: 'Account',
                    route: '/dashboard',
                    active: false,
                },
                {
                    icon: 'info',
                    menuTitle: 'Help',
                    route: '/dashboard',
                    active: false,
                },
                {
                    icon: 'logout',
                    menuTitle: 'Logout',
                    route: '/auth/login',
                    active: false,
                }
            ]
        }
    ];

    constructor() {
        this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd) {
                this.activeUrl = val.url;
            }
        });

        this.getUserDetails();

        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        const isDesktopDevice = this.deviceService.isDesktop();

        if(isMobile && isTablet) {
            this.isOpenSideNav = false;
        } else if(isDesktopDevice) {
            this.isOpenSideNav = true;
        }
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
        this.menus.forEach((menu) => {
            menu.links.forEach((link) => {
                link.active = false;
            });
        });
        route.active = true;
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
