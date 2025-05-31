// src/app/app.config.ts (ou appConfig.ts si renommé)
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 important pour ngModel
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule, HttpClientModule) // 👈 ajoute ceci
  ]
};
