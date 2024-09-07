import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBfWicJYrik0s_wSJn7Fh6o25w-7PawXzI',
  authDomain: 'investing-app-f87f1.firebaseapp.com',
  projectId: 'investing-app-f87f1',
  storageBucket: 'investing-app-f87f1.appspot.com',
  messagingSenderId: '388222332693',
  appId: '1:388222332693:web:533a0be889b9c3e4f6831c',
  measurementId: 'G-6WHEM2K7ZX',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
