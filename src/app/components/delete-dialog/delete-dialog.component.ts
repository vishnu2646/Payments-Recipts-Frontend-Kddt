import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-dialog',
    standalone: true,
    imports: [
      MatButtonModule
    ],
    templateUrl: './delete-dialog.component.html',
    styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

    @Input()
    public title: string = 'Confirm';

    @Input()
    public message: string = 'Are you sure?';

    @Output()
    public confirmed = new EventEmitter<boolean>();

    public confirm(choice: boolean) {
        this.confirmed.emit(choice);
    }
}
