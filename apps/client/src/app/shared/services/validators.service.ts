import {Injectable} from '@angular/core'
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched
  }

  getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null

    const errors = form.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Field required'

        case 'minlength':
          return `Min length: ${errors['minlength'].requiredLength} .`

        case 'pattern':
          return `Must be an url`

        case 'equal':
          return `Must be different`
      }
    }

    return null
  }

  isFieldEqualToOriginal(field: string, originalValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.get(field)?.value

      if (fieldValue === originalValue) {
        control.get(field)?.setErrors({equal: true})
        return {equal: true}
      }

      control.get(field)?.setErrors(null)
      return null
    }
  }
}
