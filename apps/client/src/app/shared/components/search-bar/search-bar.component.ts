import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core'
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

  @Output() onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((val) => {
        this.onDebounce.emit(val)
      })
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  onKeyPress(search: string) {
    this.debouncer.next(search)
  }
}
