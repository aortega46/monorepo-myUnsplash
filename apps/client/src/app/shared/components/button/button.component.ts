import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() btnStyle: 'primary' | 'secondary' | 'warning' = 'primary'
  @Input() btnClass: string = ''
  @Input() type: string = 'button'

  @Output() onClick = new EventEmitter()


  get classes(): string[]{
    return getStyles(this.btnStyle, this.btnClass)
  }

  handleClick() {
    this.onClick.emit()
  }
}
