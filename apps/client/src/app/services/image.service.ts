import {Injectable, computed, inject, signal} from '@angular/core'
import {Observable} from 'rxjs'
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

  addImage(image: Image) {
    this.http.post<Image>(`${this.baseUrl}/images`, image).subscribe((img) =>
      this.#state.update((current) => ({
        ...current,
        images: [...current.images, img],
      })),
    )
  }

  deleteImageById(id: string) {
    if (!id) throw Error('Image id is required')
    return this.http
      .delete<Image>(`${this.baseUrl}/images/${id}`)
      .subscribe((res) => {
        this.#state.update((current) => ({
          ...current,
          images: [...current.images.filter((img) => img._id !== res._id)],
        }))
      })
  }

  getImageByLabel(label: string) {
    this.http
      .get<Image[]>(`${this.baseUrl}/images?q=${label}`)
      .subscribe((images) => {
        this.#state.update((current) => ({
          ...current,
          images: [...images],
        }))
      })
  }
}
