import {Injectable, computed, inject, signal} from '@angular/core'
import {Observable} from 'rxjs'
import {Image} from '../interfaces/image'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {ToastrService} from 'ngx-toastr'

interface State {
  images: Image[]
  loading: boolean
  query: Image[]
}
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl: string = environment.baseUrl
  private http = inject(HttpClient)
  private toastr = inject(ToastrService)

  #state = signal<State>({loading: true, images: [], query: []})

  images = computed(() =>
    this.#state().query.length > 0 ? this.#state().query : this.#state().images,
  )
  loading = computed(() => this.#state().loading)

  constructor() {
    this.getAllImages().subscribe((images) => {
      this.#state.set({
        loading: false,
        query: [],
        images,
      })
    })
  }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseUrl}/images`)
  }

  addImage(image: Image) {
    this.http.post<Image>(`${this.baseUrl}/images`, image).subscribe({
      next: (img) => {
        this.#state.update((current) => ({
          ...current,
          images: [img, ...current.images],
        }))

        return this.toastr.success('Image added')
      },
      error: (err) => {
        if (err.status == 400) return this.toastr.error('Image URL not valid')
        return this.toastr.error('Something went wrong')
      },
    })
  }

  deleteImageById(id: string) {
    if (!id) throw Error('Image id is required')
    this.http.delete<Image>(`${this.baseUrl}/images/${id}`).subscribe({
      next: (res) => {
        this.#state.update((current) => ({
          ...current,
          images: [...current.images.filter((img) => img._id !== res._id)],
        }))
        return this.toastr.success('Image removed')
      },
      error: () => this.toastr.error('Something went wrong'),
    })
  }

  getImageByLabel(label: string) {
    if (!label) {
      this.#state.update((current) => ({
        ...current,
        query: [],
      }))
      return
    }

    this.http
      .get<Image[]>(`${this.baseUrl}/images?q=${label}`)
      .subscribe((images) => {
        this.#state.update((current) => ({
          ...current,
          query: [...images],
        }))
      })
  }

  editImageLabel(_id: string, label: string) {
    this.http.patch<Image>(`${this.baseUrl}/images/${_id}`, label).subscribe({
      next: (image) => {
        this.#state.update((current) => ({
          ...current,
          images: current.images.map((img) => (img._id === _id ? image : img)),
        }))
        this.toastr.success('Image edited')
      },
      error: () => this.toastr.error("Can't be edited"),
    })
  }
}
