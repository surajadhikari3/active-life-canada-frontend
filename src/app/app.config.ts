import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {authInterceptorProvider} from './auth.interceptor';
import { provideCharts } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptorsFromDi()),
    authInterceptorProvider,
    provideCharts(),
    provideRouter(routes),
    provideClientHydration(withEventReplay())]
};
