import {Component, Input, OnInit, TemplateRef, inject} from '@angular/core'
import {DialogService} from '../../services/dialog.service'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {MatDialogRef} from '@angular/material/dialog'
import {DialogComponent} from '../../shared/components/dialog/dialog.component'
import {ImageService} from '../../services/image.service'
import {Image} from '../../interfaces/image'
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe, CommonModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input({required: true}) img!: Image

  dialog?: MatDialogRef<DialogComponent>
  imageHasLoaded: boolean = false

  private dialogService = inject(DialogService)
  private imageService = inject(ImageService)

  ngOnInit(): void {
    if (!this.img) throw Error('IMG is required')
  }

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

  onImageError() {
    this.img.url = 'assets/no-image.jpg'
  }
}
