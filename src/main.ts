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
const getOrder = () => `${environment.apiUrl}/order`;
// Direct METHODS
const getDirectUrl = () => `${environment.apiUrl}${environment.apiUrlDirect}`;
const getTokenUrl = () => `${getDirectUrl()}${environment.cardToken}`;
const getCardInfoUrl = () => `${getDirectUrl()}${environment.cardInfo}`;
// Redirect methods
const getDlocalLanding = () => `${environment.apiUrl}${environment.apiUrlRedirect}`;
const getTicketUrl = () => `${getDlocalLanding()}${environment.ticketsUrl}`;
const getBancTransfer = () => `${getDlocalLanding()}${environment.bankTransfer}`

const providers = [
  { provide: 'SMALL_KEY', useFactory: getSmallKey, deps: [] },
  { provide: 'API_URL', useFactory: getApiUrl, deps: [] },
  // REDIRECT URL
  { provide: 'REDIRECT_URL', useFactory: getDlocalLanding, deps: [] },
  { provide: 'TICKET_URL', useFactory: getTicketUrl, deps: [] },
  { provide: 'BANC_TRANSFER_URL', useFactory: getBancTransfer, deps: [] },
  // DIRECT URLS
  { provide: 'CARD_TOKEN_URL', useFactory: getTokenUrl, deps: [] },
  { provide: 'CARD_INFO', useFactory: getCardInfoUrl, deps: [] },
  // COMMONS URLS
  { provide: 'ORDER_URL', useFactory: getOrder, deps: [] },
  { provide: 'METHODS', useFactory: getMethods, deps: [] }
]

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
