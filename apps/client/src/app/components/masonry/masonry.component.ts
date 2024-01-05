import {Component} from '@angular/core'
import {CardComponent} from '../card/card.component'

@Component({
  selector: 'app-masonry',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './masonry.component.html',
  styleUrl: './masonry.component.scss',
})
export class MasonryComponent {
  click() {
    console.log('cli')
  }
}
