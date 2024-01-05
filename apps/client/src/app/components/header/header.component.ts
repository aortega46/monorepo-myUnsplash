import {Component, OnDestroy} from '@angular/core'
import {ButtonComponent} from '../../shared/components/button/button.component'
import {SearchBarComponent} from '../../shared/components/search-bar/search-bar.component'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Subject, takeUntil} from 'rxjs'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  destroyed = new Subject<void>()
  mobile: boolean = false

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.mobile = !res.matches
      })
  }
  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
