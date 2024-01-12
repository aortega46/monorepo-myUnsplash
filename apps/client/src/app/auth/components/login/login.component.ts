import {Component, TemplateRef, inject} from '@angular/core'
import {ButtonComponent} from '../../../shared/components/button/button.component'
import {DialogService} from '../../../services/dialog.service'
import {DialogComponent} from '../../../shared/components/dialog/dialog.component'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {ValidatorsService} from '../../../shared/services/validators.service'
import {MatDialogRef} from '@angular/material/dialog'
import {AuthService} from '../../services/auth.service'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  dialog?: MatDialogRef<DialogComponent>

  private dialogService = inject(DialogService)
  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)
  private authService = inject(AuthService)
  private toastr = inject(ToastrService)

  myForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  openDialog(dialogTemplate: TemplateRef<DialogComponent>) {
    this.dialog = this.dialogService.openDialog({template: dialogTemplate})
  }

  closeDialog() {
    this.dialog?.close()
    this.myForm.reset()
  }

  submitDialog() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched()

    const {email, password} = this.myForm.value
    this.authService.login(email, password).subscribe({
      error: (msg) => this.toastr.error(msg),
    })
    this.closeDialog()
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError(field: string) {
    return this.validatorsService.getFieldError(this.myForm, field)
  }
}
