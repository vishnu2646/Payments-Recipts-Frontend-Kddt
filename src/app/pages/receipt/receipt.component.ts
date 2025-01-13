import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToWords } from 'to-words';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { IIncome } from '../../types/types';


@Component({
    selector: 'app-receipt',
    standalone: true,
    imports: [],
    templateUrl: './receipt.component.html',
    styleUrl: './receipt.component.scss'
})
export class ReceiptComponent {
    private router = inject(ActivatedRoute);

    private receiptId: number = 0;

    private apiService = inject(ApiService);

    private userService = inject(UserService);

    private user: { msg: String, token: { refresh: String, access: String } } = {} as { msg: String, token: { refresh: String, access: String } }

    public receiptData: IIncome = {} as IIncome;

    public toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: {
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            },
        },
    });

    constructor() {
        const id = this.router.snapshot.paramMap.get('id');
        if(id) {
            this.receiptId = Number(id);
        }
    }

    public ngOnInit(): void {
        this.getUserDetails();
        this.getReceiptData();
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user;
        }
    }

    public getReceiptData() {
        this.apiService.getIncomeDetailsService(this.receiptId, this.user).subscribe({
            next: (response: any) => {
                this.receiptData = response
            },
            error: (error: Error) => {
                console.log(error);
            },
            complete: () => {
                console.log('completed');
            }
        });
    }
}
