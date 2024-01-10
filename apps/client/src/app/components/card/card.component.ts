import {Component, Input, OnInit, TemplateRef, inject} from '@angular/core'
import {DialogService} from '../../services/dialog.service'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {MatDialogRef} from '@angular/material/dialog'
import {DialogComponent} from '../../shared/components/dialog/dialog.component'
import {ImageService} from '../../services/image.service'
import {Image} from '../../interfaces/image'
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common'
import {ValidatorsService} from '../../shared/services/validators.service'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    ButtonComponent,
    AsyncPipe,
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input({required: true}) img!: Image

  dialog?: MatDialogRef<DialogComponent>
  imageHasLoaded: boolean = false

  myForm: FormGroup = new FormGroup({
    label: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })

  validatorsService = inject(ValidatorsService)
  private dialogService = inject(DialogService)
  private imageService = inject(ImageService)

  ngOnInit(): void {
    if (!this.img) throw Error('IMG is required')
    this.setLabelValidator()
  }

  openDialog(dialogTemplate: TemplateRef<any>) {
    this.dialog = this.dialogService.openDialog({template: dialogTemplate})
  }

  closeDialog() {
    this.dialog?.close()
  }

  submitDeleteDialog() {
    this.imageService.deleteImageById(this.img._id!)
    this.closeDialog()
  }

  submitEditDialog() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched()

    this.imageService.editImageLabel(this.img._id!, this.myForm.value)
    this.closeDialog()
    this.img.label = this.myForm.value['label']
    this.myForm.reset({label: this.img.label})
  }

  onLoad() {
    this.imageHasLoaded = true
  }

  onImageError() {
    this.img.url = 'assets/no-image.jpg'
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.myForm, field)
  }

  setLabelValidator() {
    this.myForm.setValidators(
      Validators.compose([
        this.myForm.validator,
        this.validatorsService.isFieldEqualToOriginal('label', this.img.label),
      ]),
    )
    this.myForm.reset({label: this.img.label})
  }
}
