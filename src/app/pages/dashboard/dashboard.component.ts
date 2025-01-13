import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        CommonModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    private router = inject(Router);

    private apiService = inject(ApiService);

    private userService = inject(UserService);

    private lineChart: Chart | null = null;

    private barChart: Chart | null = null;

    public user: any;

    public reportData: any;

    public tilesData: any;

    public incomeBarData: any;

    public expenseBarData: any;

    public ngOnInit(): void {
        this.getUserDetails();
        this.getTilesData();
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user
        }
    }

    public getTilesData() {
        this.apiService.handleGetTilesService().subscribe({
            next: (responseData) => {
                this.tilesData = responseData;
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });

        this.apiService.handleGetExpenseBarService().subscribe({
            next: (responseData) => {
                this.expenseBarData = responseData;
                this.renderLineChart();
                this.renderBarChart();
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });

        this.apiService.handleGetIncomeBarService().subscribe({
            next: (responseData) => {
                this.incomeBarData = responseData;
                this.renderLineChart();
                this.renderBarChart();
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        });
    }

    public handleGetReportData() {
        this.apiService.handleGetReportService(this.user).subscribe({
            next: (responseData) => {
                this.reportData = responseData;
                this.router.navigateByUrl('/report', { state: responseData });
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

            }
        })
    }

    public renderLineChart() {
        if (this.lineChart) {
            this.lineChart.destroy();
        }
        this.lineChart = new Chart('linechart', {
            type: 'line',
            data: {
                labels: this.incomeBarData?.labels,
                datasets: [
                    {
                        label: "income",
                        data: this.incomeBarData?.data,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: 'origin'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    public renderBarChart() {
        if (!this.expenseBarData) {
            console.warn('Expense data not available yet.');
            return;
        }

        if (this.barChart) {
            this.barChart.destroy();
        }

        this.barChart = new Chart('barchart', {
            type: 'bar',
            data: {
                labels: this.expenseBarData.labels,
                datasets: [
                    {
                        label: "expense",
                        data: this.expenseBarData.data,
                        backgroundColor: [
                            "rgba(253, 127, 111, 0.8)",
                            "rgba(126, 176, 213, 0.8)",
                            "rgba(178, 224, 97, 0.8)",
                            "rgba(189, 126, 190, 0.8)",
                            "rgba(255, 181, 90, 0.8)",
                            "rgba(255, 238, 101, 0.8)",
                            "rgba(190, 185, 219, 0.8)",
                            "rgba(253, 204, 229, 0.8)",
                            "rgba(139, 211, 199, 0.8)"
                        ],
                        borderColor: [
                            "rgb(253, 127, 111)",
                            "rgb(126, 176, 213)",
                            "rgb(178, 224, 97)",
                            "rgb(189, 126, 190)",
                            "rgb(255, 181, 90)",
                            "rgb(255, 238, 101)",
                            "rgb(190, 185, 219)",
                            "rgb(253, 204, 229)",
                            "rgb(139, 211, 199)"
                        ],
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                indexAxis: 'y'
            }
        });
    }
}
