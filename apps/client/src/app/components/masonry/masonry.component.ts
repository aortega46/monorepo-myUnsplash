import {Component, OnInit, inject} from '@angular/core'
import {CardComponent} from '../card/card.component'
import {Image} from '../../interfaces/image'
import {ImageService} from '../../services/image.service'

@Component({
  selector: 'app-masonry',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './masonry.component.html',
  styleUrl: './masonry.component.scss',
})
export class MasonryComponent {
  imageService = inject(ImageService)
}
