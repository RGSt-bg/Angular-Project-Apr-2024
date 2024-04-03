import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    const { apiUrl } = environment;
    return this.http
      .post<User>(`${apiUrl}/auth/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)
      ));
  }

  getProfile() {
    return this.http
      .get<User>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // Jen's code
  //   login(username: string, password: string) {
  //     const { apiUrl } = environment;
  //     return this.http.post<UserAuth>(`${apiUrl}/login`, { username, password }, {withCredentials: true})
  //        .pipe(tap((user) => {
  //           this.user$$.next(user);
  //           sessionStorage.setItem(this.KEY, JSON.stringify(user));
  //        }))
  //  };

  register(username: string, email: string,
          password: string, rePassword: string) {
    const { apiUrl } = environment;
    return this.http
      .post<User>(`${apiUrl}/auth/register`, {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    const { apiUrl } = environment;
    return this.http
      .post(`${apiUrl}/auth/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}