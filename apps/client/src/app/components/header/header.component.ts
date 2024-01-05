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
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    )
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null

    const errors = this.myForm.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Field required'

        case 'minlength':
          return `Min length: ${errors['minlength'].requiredLength} .`

        case 'pattern':
          return `Must be an url`
      }
    }

    return null
  }

  submitDialog() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched()

    // TODO: call Image service http
    console.log(this.myForm.value)

    this.closeDialog()
  }
}
