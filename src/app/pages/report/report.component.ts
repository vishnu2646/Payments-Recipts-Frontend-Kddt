import { Component, inject, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { IReport } from '../../types/types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './report.component.html',
    styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);

    public reportData: any;

    public ngOnInit(): void {
        this.reportData = history.state;
        console.log(this.reportData);
    }
}
