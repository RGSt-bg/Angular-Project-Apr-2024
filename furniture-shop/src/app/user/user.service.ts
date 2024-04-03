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

// export class UserService {
//   private user$$ = new BehaviorSubject<User | undefined>(undefined);
//   public user$ = this.user$$.asObservable();
//   private sessionToken: string | null = null;

//   user: User | undefined = undefined;
//   USER_KEY = '[user]';

//   get isLogged(): boolean {
//     return !!this.user;
//   }

//   subscription: Subscription;

//   private apiUrl = environment.apiUrl;
//   private headers = new HttpHeaders({
//     // 'X-Parse-Application-Id': environment.appId,
//     // 'X-Parse-JavaScript-Key': environment.javascriptKey,
//     'Content-Type': 'application/json',
//   });

//   constructor(private http: HttpClient) {
//     this.subscription = this.user$.subscribe((user) => {
//       this.user = user;
//     });
//   }

//   getUserProfile(id: string) {
//     return this.http
//       .get<User>(`${this.apiUrl}/auth/users/${id}`, {
//         headers: this.headers,
//       })
//   }

//   // createGiveUser(id: string | undefined, data: { posts: string[] | undefined }, sessionToken: string | undefined) {
//   //   this.headers = this.headers.set('X-Parse-Session-Token', sessionToken || '');

//   //   return this.http
//   //     .put<User>(`${this.apiUrl}/users/${id}`, data, {
//   //       headers: this.headers,
//   //     })
//   //     .pipe(tap((user) => this.user$$.next(user)));
//   // }

//   register(username: string, email: string, password: string) {
//     const data = {
//       username,
//       email,
//       password,
//     };

//     return this.http
//       .post<User>(`${this.apiUrl}/auth/register`, data, {
//         headers: this.headers,
//       })
//       .pipe(tap((user) => {
//         this.user$$.next(user);
//         // this.setSessionToken(user.sessionToken);
//       }));
//   }

//   login(email: string, password: string) {
//     const url = `${this.apiUrl}/auth/login?email=${encodeURIComponent(
//       email
//     )}&password=${encodeURIComponent(password)}`;

// console.log('userService login -> url: ', url);

//     const request = this.http
//       .get<User>(url, {
//         headers: this.headers,
//       })
//       .pipe(
//         tap((user) => {
//           this.user$$.next(user);
//           // this.setSessionToken(user.sessionToken);
//         })
//       );

//     // this.setSessionToken(this.user$$._value.sessionToken);
//     return request;
//   }

//   logout() {
//     this.headers = this.headers.set('X-Parse-Session-Token', this.sessionToken || '');
//     return this.http
//       .post(
//         `${this.apiUrl}/auth/logout`,
//         {},
//         {
//           headers: this.headers,
//         }
//       )
//       .pipe(tap(() => this.user$$.next(undefined)));
//   }

//   // setSessionToken(token: string) {
//   //   this.sessionToken = token;
//   // }

//   // getSessionToken(): string {
//   //   return this.sessionToken || '';
//   // }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }
// }
