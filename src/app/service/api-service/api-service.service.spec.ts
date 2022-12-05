import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment'

describe('ApiServiceService', () => {
  let service: ApiService;
  let httpClient: HttpTestingController;
  const methodsUrl = environment.apiUrl + environment.methods;
  const cardInfoUrl = environment.apiUrl + environment.cardInfo;
  const orderUrl = `${environment.apiUrl}/order`;


  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            { provide: 'METHODS', useValue: methodsUrl },
            { provide: 'CARD_INFO', useValue: cardInfoUrl },
            { provide: 'ORDER_URL', useValue: orderUrl }
        ],
        imports: [
            HttpClientTestingModule,
        ]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpTestingController); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
