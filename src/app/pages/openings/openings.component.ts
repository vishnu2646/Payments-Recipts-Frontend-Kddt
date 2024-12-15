import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-openings',
    standalone: true,
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        MatTableModule,
        CommonModule,
        MatIconModule
    ],
    templateUrl: './openings.component.html',
    styleUrl: './openings.component.scss'
})
export class OpeningsComponent implements OnInit {

    private apiService = inject(ApiService);

    private userService = inject(UserService);

    public user: any;

    public displayColumns = ['cashatbank', 'cashatbankexp', 'cashinhand', 'actions'];

    public openingDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    public isEditMode = false;

    public isDisabled = true;

    public formData = {
        id:'',
        cashatbank: '',
        cashinhand: '',
        cashatbankexp: ''
    }

    public ngOnInit(): void {
        this.getUserDetails();
        this.handleOpeningDatas();
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user
        }
    }

    public handleOpeningDatas() {
        this.apiService.handleGetOpeningsService(this.user).subscribe({
            next: (responseData) => {
                this.openingDataSource.data = responseData;
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });
    }

    public handlecreateOpenings() {
        this.apiService.handleCreateOpeningsService(this.user, this.formData).subscribe({
            next: (responseData) => {
                alert(responseData);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        })
    }

    public handleEditOpening(data: any) {
        this.formData = data;
        this.isEditMode = !this.isEditMode;
    }

    public handleUpdateOpening() {
        this.apiService.handleUpdateOpeningService(this.user, this.formData).subscribe({
            next: (responseData) => {
                alert(responseData);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

                this.isEditMode = !this.isEditMode;
                this.formData = {
                    id:'',
                    cashatbank: '',
                    cashinhand: '',
                    cashatbankexp: ''
                }
            }
        });
    }

    public handleDeleteService(data: any) {
        this.apiService.handleDeleteOpeningService(this.user, data.id).subscribe({
            next: (responseData) => {
                alert(responseData);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });
    }

    public handleChange(event: any) {
        if(this.formData.cashatbank && this.formData.cashinhand && this.formData.cashatbankexp) {
            this.isDisabled = false;
        } else {
            this.isDisabled = true;
        }
    }
}
