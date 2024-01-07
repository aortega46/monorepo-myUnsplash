import {Component, Input, TemplateRef, inject} from '@angular/core'
import {DialogService} from '../../services/dialog.service'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {MatDialogRef} from '@angular/material/dialog'
import {DialogComponent} from '../../shared/components/dialog/dialog.component'
import {ImageService} from '../../services/image.service'
import {Image} from '../../interfaces/image'
import {ImagePipe} from '../../pipes/image.pipe'
import {AsyncPipe, CommonModule} from '@angular/common'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, ImagePipe, AsyncPipe, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({required: true}) img!: Image

  dialog?: MatDialogRef<DialogComponent>
  imageHasLoaded: boolean = false

  private dialogService = inject(DialogService)
  private imageService = inject(ImageService)

  openDialog(dialogTemplate: TemplateRef<any>) {
    this.dialog = this.dialogService.openDialog({template: dialogTemplate})
  }

  closeDialog() {
    this.dialog?.close()
  }

  submitDialog() {
    this.imageService.deleteImageById(this.img._id!)
    this.closeDialog()
  }

  onLoad() {
    this.imageHasLoaded = true
  }
}
