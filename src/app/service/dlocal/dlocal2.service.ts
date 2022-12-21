  import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, from, merge, of, fromEvent, Subject, BehaviorSubject, filter } from 'rxjs';

import { Settings, Brand, EventChangePanField, } from '../../model/DlocalSettings'
import { create, removeScript } from './moutScript/mountScript';
import { Field } from './model/field';

declare let dlocal: any;

@Injectable({
  providedIn: 'root'
})
export class DLocalService {

  fields: any;

  private dlocalInstance: any;

  constructor(
    private httpClient: HttpClient,
    @Inject('DLOCAL_CDN_URL') private cdnURL: string,
    @Inject('SMALL_KEY') private smallKey: string,
    @Inject('METHODS') private methodsUrl: string
  ) {
    this.dlocalInstance = null;
  }

  // Creando Observable de insercion y lectura del CDN
  init(): Observable<any> {
    return new Observable((observer) => {
      const scriptCreated = create(this.cdnURL);

      const handler = () => {
        this.dlocalInstance = dlocal(this.smallKey);//Creando instancia dlocal

        this.fields = this.dlocalInstance.fields({//Creando intancia de fields
          locale: 'es',
          country: 'UY'
        });

        const data = from([this.dlocalInstance]);
        
        return observer.next({
          message: "Dlocal instance created successfully",
          instance: this.dlocalInstance
        });
      }
      scriptCreated.addEventListener('load', handler, false);

      return () => scriptCreated.removeEventListener('load', handler, false);
    });
  }

  removeScript() {
    removeScript(this.cdnURL)
  }

  // Mounting
  mountField(
    type: 'pan' | 'expiration' | 'cvv' | 'card',
    containerId: string = 'panField',
    settings: Settings = this.defaultSettings(),
    errorContainer?: string
  ) {
    
    const field = this.fields.create(type, settings);
    field.mount(document.getElementById(containerId));
    
    return { 
      type: type ,
      onChange: this.fieldChange({...field}),
      onComplete: this.fieldComplete({...field}),
      onFocus: this.fieldFocus({...field}),
      onBlur: this.fieldBlur({...field}),
      onBrand: this.fieldBrand({...field}),
      onError: this.fieldError({...field}),

      ...field,
      createToken: (name: string, currency: string) => from([field.createToken({
        name: name,
        currency: currency
      })])
     };
  }

  fieldEventListener(
    field: Field,
    eventName: 'change' | 'focus' | 'blur' | 'brand' | 'error' | 'complete' | 'empty' | 'ready' | 'autofilled',
    errorHandler?: Function
    ): Observable<EventChangePanField> {
    return new Observable<any>((observer) => {
      const handler = (e: EventChangePanField) => {
       return observer.next(e);
      }

      try {
        field.on(eventName, handler);

        return () => {
          console.error(`Error occurred on ${field.type} event name: ${eventName}`);
          field.blur();
        }
      } catch (_) {
        return observer.error('Field Undefined or null')
      }
    })
  }

  fieldChange(field: Field): Observable<any> {
    return this.fieldEventListener(field, 'change');
  }

  fieldComplete(field: any): Observable<any> {
    return this.fieldEventListener(field, 'change').pipe(
      filter((e) => e.complete === true)
    ); 
  }

  fieldError(field: any): Observable<any> {
    return this.fieldEventListener(field, 'error');
  }

  fieldBrand(field: any): Observable<any> {
    return this.fieldEventListener(field, 'brand');
  }

  fieldFocus(field: any): Observable<any>  {
    return this.fieldEventListener(field, 'focus');
  }

  fieldBlur(field: any): Observable<any> {
    return this.fieldEventListener(field, 'blur');
  }

  

  fieldToken(field: Field, cardHolderName: string, currency: string = 'UYU'): Observable<any> {

    return from(this.dlocalInstance.createToken(field, {
      name: cardHolderName,
      currency: currency
    }));
    //.then((response: any) => {
    //  console.log(response);
    //})
    //.catch(() => {
    //  console.log('Error creating token');
    // });
  }

  defaultSettings(): Settings {
    return {
      style: {
        base: {
          fontSize: '16px',
        }
      }
    }
  }
}
