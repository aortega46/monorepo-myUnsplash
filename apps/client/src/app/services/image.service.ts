import {Injectable, inject} from '@angular/core'
import {Observable, catchError, map, of} from 'rxjs'
import {Image} from '../interfaces/image'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl: string = environment.baseUrl

  http = inject(HttpClient)

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseUrl}/images`)
  }

  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(`${this.baseUrl}/images`, image)
  }

  deleteImageById(id: number): Observable<boolean> {
    if (!id) throw Error('Image id is required')
    return this.http.delete(`${this.baseUrl}/images/${id}`).pipe(
      map((res) => true),
      catchError((err) => of(false)),
    )
  }

  getImageByLabel(label: string): Observable<Image> | undefined {
    return of()
  }
}
