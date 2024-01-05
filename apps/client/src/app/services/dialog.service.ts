import {Injectable, TemplateRef, inject} from '@angular/core'
import {DialogComponent} from '../shared/components/dialog/dialog.component'
import {MatDialog} from '@angular/material/dialog'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  matDialog = inject(MatDialog)

  openDialog(data: {template: TemplateRef<any>}) {
    return this.matDialog.open(DialogComponent, {data})
  }
}
