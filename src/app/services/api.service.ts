import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExepnse, IExpenseType, IIncome, IIncomeType } from '../types/types';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiUrl;

    private httpClient = inject(HttpClient);

    public handleLoginService(data: any): Observable<any>  {
        return this.httpClient.post(`${this.baseUrl}/login/`, data);
    }

    public handleRegisterService(data: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/register/`, data);
    }

    public handleLogoutService(options: any): Observable<any>  {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        const data = {
            "refresh": options.token.refresh
        }

        return this.httpClient.post(`${this.baseUrl}/logout/`, data ,{ headers });
    }

    public handleGetTilesService(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/tiles/`);
    }

    public handleGetExpenseBarService(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/expense/bar/`);
    }

    public handleGetIncomeBarService(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/income/bar/`);
    }

    public handleCreateIncome(data: any, options: any): Observable<any> {

        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.post(`${this.baseUrl}/income/create/`, data, { headers });
    }

    public handleCreateExpense(data: any, options: any): Observable<any> {

        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.post(`${this.baseUrl}/expense/create/`, data, { headers });
    }

    public handleGetIncomeService(options: any): Observable<IIncome[]> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get<IIncome[]>(`${this.baseUrl}/income/list/`, { headers });
    }

    public getIncomeDetailsService(id: number, options: any): Observable<IIncome> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.get<IIncome>(`${this.baseUrl}/income/detail/${id}`, { headers });
    }

    public handleGetIncomeTypeService(options: any): Observable<IIncomeType[]> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get<IIncomeType[]>(`${this.baseUrl}/incometype/list/`, { headers });
    }

    public handleCreateIncomeTypeService(data: any, options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.post(`${this.baseUrl}/incometype/create/`, data, { headers });
    }

    public handleDeleteIncomeService(id: number, options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.delete(`${this.baseUrl}/income/delete/${id}`, { headers });
    }

    public handleGetExpenseService(options: any): Observable<IExepnse[]> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get<IExepnse[]>(`${this.baseUrl}/expense/list/`, { headers });
    }

    public handleGetExpenseDetailService(id: number, options: any): Observable<IExepnse> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get<IExepnse>(`${this.baseUrl}/expense/detail/${id}/`, { headers });
    }

    public handleUpdateIncomeService(id: number, options: any, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.post<any>(`${this.baseUrl}/income/update/${id}/`, data , { headers });
    }

    public handleUpdateExpenseService(id: number, options: any, data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/expense/update/${id}/`, data);
    }

    public handleDeleteExpenseservice(id: number, options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.delete(`${this.baseUrl}/expense/delete/${id}`, { headers });
    }

    public handleGetExpenseTypeService(options: any): Observable<IExpenseType[]> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get<IExpenseType[]>(`${this.baseUrl}/expensetype/list/`, { headers });
    }

    public handleCreateExpenseTypeService(data: any, options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.post(`${this.baseUrl}/expensetype/create/`, data, { headers });
    }

    public handleCreatepeningsService(data: any, options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.post(`${this.baseUrl}/`, data, { headers });
    }

    public handleGetReportService(options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.get(`${this.baseUrl}/report/`, { headers });
    }

    public handleGetOpeningsService(options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.get(`${this.baseUrl}/openings/`, { headers });
    }

    public handleCreateOpeningsService(options: any, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.post(`${this.baseUrl}/openings/create`, data, { headers });
    }

    public handleUpdateOpeningService(options: any, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.post(`${this.baseUrl}/openings/update/${data.id}/`, data, { headers });
    }

    public handleDeleteOpeningService(options: any, id: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });
        return this.httpClient.delete(`${this.baseUrl}/openings/delete/${id}/`, { headers });
    }

    public handleDeleteAllIncomeAndExpenseService(options: any): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${options.token.access}`
        });

        return this.httpClient.get(`${this.baseUrl}/delete/all/`, { headers });
    }
}
