import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private apiService = inject(ApiService);

    private router = inject(Router);

    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';

    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    private _snackBar = inject(MatSnackBar);

    public loginForm = {
        email: '',
        password: ''
    }

    public handleLogin() {
        this.apiService.handleLoginService(this.loginForm).pipe().subscribe({
            next: (responseData) => {
                const response = responseData;
                this.openSnackBar(response.msg)
                sessionStorage.setItem('user', JSON.stringify(response));
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {
                console.log("Completed...")
            }
        })
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000
        });
    }
}
