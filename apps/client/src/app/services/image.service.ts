import {Injectable, computed, inject, signal} from '@angular/core'
import {Observable, catchError, map, of} from 'rxjs'
import {Image} from '../interfaces/image'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'

interface State {
  images: Image[]
  loading: boolean
}
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl: string = environment.baseUrl
  private http = inject(HttpClient)

  #state = signal<State>({loading: true, images: []})

  images = computed(() => this.#state().images)
  loading = computed(() => this.#state().loading)

  constructor() {
    this.getAllImages().subscribe((images) => {
      this.#state.set({
        loading: false,
        images,
      })
    })
  }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseUrl}/images`)
  }

  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(`${this.baseUrl}/images`, image)
  }

  deleteImageById(id: string): Observable<boolean> {
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
