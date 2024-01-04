import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

const getStyles = (...args:string[]) => ["button", ...args].filter(Boolean)

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({required:true}) label: string = ''

  @Input({required: true}) type: 'primary' | 'secondary' | 'warning' = 'primary'

  get classes(): string[]{
    return getStyles(this.type)
  }
}
