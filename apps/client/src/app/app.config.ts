import {ApplicationConfig} from '@angular/core'
import {provideRouter, withHashLocation} from '@angular/router'

import {routes} from './app.routes'
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideHttpClient} from '@angular/common/http'
import {provideToastr} from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({positionClass: 'toast-bottom-right'}),
  ],
}
