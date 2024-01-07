import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'imagePipe',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(url: string) {
    return fetch(url)
      .then((res) => res.blob())
      .then((buff) =>
        buff.type.startsWith('image/') ? url : 'assets/no-image.jpg',
      )
  }
}
