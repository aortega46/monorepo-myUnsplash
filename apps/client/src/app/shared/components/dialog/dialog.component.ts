import {Component, Inject, TemplateRef} from '@angular/core'
import {ButtonComponent} from '../button/button.component'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'shared-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    CommonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {template: TemplateRef<any>},
  ) {}
}
