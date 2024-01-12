import {Injectable, computed, inject, signal} from '@angular/core'
import {AuthStatus} from '../interfaces/auth-status'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable, catchError, map, of, throwError} from 'rxjs'
import {LoginResponse} from '../interfaces/login-response'
import {CheckTokenResponse} from '../interfaces/check-token-response'
import {User} from '../interfaces/user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl
  private http = inject(HttpClient)

  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  authStatus = computed(() => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  setAuth(user: User, token: string): boolean {
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`
    const body = {email, password}

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({user, token}) => this.setAuth(user, token)),
      catchError((err) => throwError(() => err.error.message)),
    )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check`
    const token = localStorage.getItem('token')

    if (!token) {
      this.logout()
      return of(false)
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, {headers}).pipe(
      map(({user, token}) => this.setAuth(user, token)),
      catchError((err) => {
        this._authStatus.set(AuthStatus.notAuthenticated)
        return of(false)
      }),
    )
  }

  logout() {
    localStorage.removeItem('token')
    this._authStatus.set(AuthStatus.notAuthenticated)
  }
}
