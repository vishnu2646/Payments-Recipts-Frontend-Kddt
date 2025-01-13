import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    private router = inject(Router);

    private _snackBar = inject(MatSnackBar);

    private apiService = inject(ApiService);
    
    public signupData = {
        email: '',
        password: '',
        password2: '',
        tc: false,
        name: '',
    };

    public handleCreateAccount() {
        if(this.signupData.password !== this.signupData.password2) {
            this.openSnackBar('Password is not Matched with RePassword');
        } else {
            this.apiService.handleRegisterService(this.signupData).subscribe({
                next: (response) => {
                    this.openSnackBar(response.msg);
                    this.router.navigate(['/auth/login']);
                },
                error: (error: Error) => {
                    console.log(error);
                },
                complete: () => {
                    console.log('complted');
                }
            })
        }
    }

    public handleNavigateToLogin() {
        this.router.navigate(['/auth/login']);
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000
        });
    }
}
