import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomPaginator } from './api.config';
import { MatPaginatorIntl } from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), 
    provideToastr({}),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ]
};
