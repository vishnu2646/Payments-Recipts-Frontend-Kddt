import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { IExepnse, IIncome } from '../../types/types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

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
        CommonModule,
        MatIconModule,
        RouterModule
    ],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent {
    private activatedRoute = inject(ActivatedRoute);

    private userService = inject(UserService);

    private apiService = inject(ApiService);

    private router = inject(Router);

    private _snackBar = inject(MatSnackBar);

    private cd = inject(ChangeDetectorRef);

    private type: "income" | "expense" = "income";

    public isIncomeLoading: boolean = false;

    public isExpenseLoading: boolean = false;

    private user: { msg: String, token: { refresh: String, access: String } } = {} as { msg: String, token: { refresh: String, access: String } }

    public formType = ['Income', 'Expense'];

    public selectedType = 'Income';

    public displayIncomeColumns: String[] = [];

    public displayExpenseColumns: String[] = [];

    public incomeDataSource: MatTableDataSource<IIncome> = new MatTableDataSource<IIncome>();

    public incomeData: IIncome[] = [];

    public allIncomeData: IIncome[] = [];

    public expenseDataSource: MatTableDataSource<IExepnse> = new MatTableDataSource<IExepnse>();

    public ngOnInit(): void {
        this.getUserDetails();

        this.activatedRoute.queryParams.subscribe((params) => {
            if (params['type'] === 'income') {
                this.selectedType = 'Income';
                this.type = 'income';
                this.handleGetIncomeData();
            } else if (params['type'] === 'expense') {
                this.selectedType = 'Expense';
                this.type = 'expense';
                this.handleGetExpenseData();
            } else {
                this.selectedType = 'Income';
                this.type = 'income';
                this.handleGetIncomeData();
            }
        });
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user;
        }
    }

    public handleFormTypeChange(event: MatSelectChange) {
        this.selectedType = event.source.value;
        this.type = this.selectedType.toLowerCase() as "income" | "expense";

        this.router.navigate(['/dashboard/data'], { queryParams: { type: this.type } });
    }

    public applyIncomeFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.incomeData = this.allIncomeData.filter(income =>
            Object.values(income).some(val =>
                val && val.toString().toLowerCase().includes(filterValue)
            )
        );
    }

    public applyExpenseFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.expenseDataSource.filter = filterValue.trim().toLowerCase();
    }

    public handleDeleteIncome(income: IIncome) {
        this.apiService.handleDeleteIncomeService(income.incid, this.user).subscribe({
            next: (response: any) => {
                this.openSnackBar('Income deleted successfully');
                this.handleGetIncomeData();
                this.cd.detectChanges();
            },
            error: (error: Error) => {
                console.log(error);
            },
            complete: () => {
                console.log("complete");
            }
        });
    }

    public handleDeleteExpense(id: number) {
        this.apiService.handleDeleteExpenseservice(id, this.user).subscribe({
            next: (response: any) => {
                this.openSnackBar('Expense deleted successfully');
                this.handleGetExpenseData();
                this.cd.detectChanges();
            },
            error: (error: Error) => {
                console.log(error);
            },
            complete: () => {
                console.log("complete");
            }
        })
    }

    public handleRouteUpdateIncome(row: IIncome) {
        this.router.navigate(['/dashboard/form'], { queryParams: { id: row.incid, type: 'income' } });
    }

    public handleRouteUpdateExpense(row: IExepnse) {
        this.router.navigate(['/dashboard/form'], { queryParams: { id: row.expid, type: 'expense' } });
    }

    private handleGetIncomeData() {
        this.apiService.handleGetIncomeService(this.user).subscribe({
            next: (data: IIncome[]) => {
                const sortedData = data.sort((a, b) => a.incid - b.incid);
                this.allIncomeData = sortedData;
                this.incomeData = [...sortedData];
                this.cd.detectChanges();
                this.isIncomeLoading = false;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    private handleGetExpenseData() {
        this.apiService.handleGetExpenseService(this.user).subscribe({
            next: (data: IExepnse[]) => {
                this.expenseDataSource.data = data.sort((a, b) => a.expid - b.expid);
                this.displayExpenseColumns = Object.keys(data[0]);
                this.displayExpenseColumns = [...this.displayExpenseColumns, 'Action'];
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000
        });
    }
}
