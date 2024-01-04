import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MasonryComponent } from '../../components/masonry/masonry.component';

@Component({
  selector: 'app-unsplash-screen',
  standalone: true,
  imports: [HeaderComponent, MasonryComponent],
  templateUrl: './unsplash-screen.component.html',
  styleUrl: './unsplash-screen.component.scss'
})
export class UnsplashScreenComponent {

}
