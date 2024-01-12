import {HttpInterceptorFn} from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq = req

  const token = localStorage.getItem('token')

  if (token) {
    newReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
    })
  }

  return next(newReq)
}
