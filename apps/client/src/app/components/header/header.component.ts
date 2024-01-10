import {Component, OnDestroy, TemplateRef, inject} from '@angular/core'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {SearchBarComponent} from '../../shared/components/search-bar/search-bar.component'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Subject, takeUntil} from 'rxjs'
import {DialogComponent} from '../../shared/components/dialog/dialog.component'
import {DialogService} from '../../services/dialog.service'
import {MatDialogRef} from '@angular/material/dialog'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {ImageService} from '../../services/image.service'
import {Image} from '../../interfaces/image'
import {ValidatorsService} from '../../shared/services/validators.service'

const urlRegex = RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    SearchBarComponent,
    DialogComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  destroyed = new Subject<void>()
  mobile: boolean = false

  dialog?: MatDialogRef<DialogComponent>

  myForm: FormGroup = this.fb.group({
    label: ['', [Validators.required, Validators.minLength(4)]],
    url: ['', [Validators.required, Validators.pattern(urlRegex)]],
  })

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private imageSerice: ImageService,
    private validatorsService: ValidatorsService,
  ) {
    this.changeButtonBreakpoint()
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  changeButtonBreakpoint() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.mobile = !res.matches
      })
  }

  openDialog(dialogTemplate: TemplateRef<any>) {
    this.dialog = this.dialogService.openDialog({template: dialogTemplate})
  }

  closeDialog() {
    this.dialog?.close()
    this.myForm.reset()
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field)
  }

  submitDialog() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched()

    const newImg: Image = this.myForm.value as Image
    this.imageSerice.addImage(newImg)
    this.closeDialog()
  }

  findByLabel(search: string) {
    this.imageSerice.getImageByLabel(search)
  }
}
