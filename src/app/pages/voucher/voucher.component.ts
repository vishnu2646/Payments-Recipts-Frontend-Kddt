import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { IExepnse } from '../../types/types';
import { ToWords } from 'to-words';

@Component({
    selector: 'app-voucher',
    standalone: true,
    imports: [],
    templateUrl: './voucher.component.html',
    styleUrl: './voucher.component.scss'
})
export class VoucherComponent {
    private router = inject(ActivatedRoute);
    
    private voucherId: number = 0;

    private apiService = inject(ApiService);

    private userService = inject(UserService);

    private user: { msg: String, token: { refresh: String, access: String } } = {} as { msg: String, token: { refresh: String, access: String } }

    public voucherData: IExepnse = {} as IExepnse;

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
            this.voucherId = Number(id);
        }
    }

    public ngOnInit(): void {
        this.getUserDetails();
        this.getVoucherDetails();
    }

    public getUserDetails() {
        const user = this.userService.getUserData();
        if(user) {
            this.user = user;
        }
    }

    public getVoucherDetails() {
        this.apiService.handleGetExpenseDetailService(this.voucherId, this.user).subscribe({
            next: (response: IExepnse) => {
                this.voucherData = response;
            },
            error: (error: Error) => {
                console.log(error);
            },
            complete: () => {
                console.log("complete");
            }
        })
    }
}
