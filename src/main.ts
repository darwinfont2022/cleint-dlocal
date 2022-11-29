import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function getSmallKey() {
  return environment.smallKey;
}

function getApiUrl() {
  return environment.apiUrl;
}

const getMethods = () => `${environment.apiUrl}${environment.methods}`;

const providers = [
  { provide: 'SMALL_KEY', useFactory: getSmallKey, deps: [] },
  { provide: 'API_URL', useFactory: getApiUrl, deps: [] },
  { provide: 'METHODS', useFactory: getMethods, deps: [] }
]

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
