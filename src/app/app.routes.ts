import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { FormComponent } from './pages/form/form.component';
import { DataComponent } from './pages/data/data.component';
import { authGuard } from './guard/auth.guard';
import { OpeningsComponent } from './pages/openings/openings.component';
import { ReportComponent } from './pages/report/report.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'form',
                component: FormComponent,
            },
            {
                path: 'data',
                component: DataComponent
            },
            {
                path: 'openings',
                component: OpeningsComponent
            }
        ]
    },
    {
        path: 'report',
        component: ReportComponent
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];
