import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { IExepnse, IIncome } from '../../types/types';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule, MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        CommonModule
    ],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent {
    private userService = inject(UserService);

    private apiService = inject(ApiService);

    private user: { msg: String, token: { refresh: String, access: String } } = {} as { msg: String, token: { refresh: String, access: String } }

    public formType = ['Income', 'Expense'];

    public selectedType = 'Income';

    public displayIncomeColumns: String[] = [];

    public displayExpenseColumns: String[] = [];

    public incomeDataSource: MatTableDataSource<IIncome> = new MatTableDataSource<IIncome>();

    public expenseDataSource: MatTableDataSource<IExepnse> = new MatTableDataSource<IExepnse>();

    // @ViewChild('paginatorIncome')
    // public paginator!: MatPaginator;

    // @ViewChild('paginatorExpense')
    // public paginatorExpense!: MatPaginator;

    public ngAfterViewInit() {
        this.getUserDetails();
        this.handleGetIncomeData();
        // this.incomeDataSource.paginator = this.paginator;
        // this.expenseDataSource.paginator = this.paginatorExpense;
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user
        }
    }

    public handleFormTypeChange(event: MatSelectChange) {
        this.selectedType = event.source.value;
        if(this.selectedType === 'Expense') {
            this.handleGetExpenseData();
        } else {
            this.handleGetIncomeData();
        }
    }

    public applyIncomeFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.incomeDataSource.filter = filterValue.trim().toLowerCase();

        if (this.incomeDataSource.paginator) {
            this.incomeDataSource.paginator.firstPage();
        }
    }

    public applyExpenseFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.expenseDataSource.filter = filterValue.trim().toLowerCase();

        if (this.expenseDataSource.paginator) {
            this.expenseDataSource.paginator.firstPage();
        }
    }

    private handleGetIncomeData() {
        this.apiService.handleGetIncomeService(this.user).subscribe({
            next: (data: IIncome[]) => {
                this.incomeDataSource.data = data;
                this.displayIncomeColumns = Object.keys(data[0])
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });
    }

    private handleGetExpenseData() {
        this.apiService.handleGetExpenseService(this.user).subscribe({
            next: (data: IExepnse[]) => {
                this.expenseDataSource.data = data;
                this.displayExpenseColumns = Object.keys(data[0])
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });
    }
}
