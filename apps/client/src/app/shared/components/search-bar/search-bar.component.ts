import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {Subject, Subscription, debounceTime} from 'rxjs'

@Component({
  selector: 'shared-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription

  loading: boolean = false

  @Output() onDebounce: EventEmitter<string> = new EventEmitter()
  @ViewChild('txtInput') txtInput!: ElementRef

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((val) => {
        this.onDebounce.emit(val)
        this.loading = false
      })
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  onKeyPress(search: string) {
    this.loading = true
    this.debouncer.next(search)
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.onDebounce.emit(this.txtInput.nativeElement.value)
  }
}
