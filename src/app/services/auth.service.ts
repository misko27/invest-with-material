import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // Login with email and password
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Logout the user
  logout(): Observable<any> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  // Auto-login for example using localStorage token
  autoLogin$(): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  getUserEmail(): string | null {
    return this.auth.currentUser?.email || null;
  }
}
