import {Component, Input, TemplateRef, inject} from '@angular/core'
import {DialogService} from '../../services/dialog.service'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {MatDialogRef} from '@angular/material/dialog'
import {DialogComponent} from '../../shared/components/dialog/dialog.component'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() size!: string

  dialog?: MatDialogRef<DialogComponent>

  dialogService = inject(DialogService)

  openDialog(dialogTemplate: TemplateRef<any>) {
    this.dialog = this.dialogService.openDialog({template: dialogTemplate})
  }

  closeDialog() {
    this.dialog?.close()
  }

  submitDialog() {
    // TODO: call Image service http

    this.closeDialog()
  }
}
