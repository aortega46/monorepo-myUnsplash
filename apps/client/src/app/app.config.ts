import {ApplicationConfig} from '@angular/core'
import {provideRouter, withHashLocation} from '@angular/router'

import {routes} from './app.routes'
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {provideToastr} from 'ngx-toastr'
import { authInterceptor } from './auth/interceptors/auth.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({positionClass: 'toast-bottom-right'}),
  ],
}
