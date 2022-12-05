import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

declare let dlocal: any;

@Injectable({
  providedIn: 'root'
})
export class DLocalService {

  fields: any;
  card: any;
  expiration: any;
  cvv: any;
  style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
    }
  };
  private smallKey: string;
  dlocalInstance: any;

  element: any;

  constructor(private httpClient: HttpClient ,
    @Inject('SMALL_KEY') smallKey: string,
    @Inject('METHODS') private methodsUrl: string
    ) {
    this.smallKey = smallKey;
    this.appendScript()
    // this.dlocalInstance = dlocal(this.smallKey);
    // this.fields = this.dlocalInstance.fields({
    //   locale: 'es',
    //   country: 'UY'
    // });

    // this.card = this.fields.create('card', { style: this.style });
  }
  
  async appendScript() {
    try {
      const script : HTMLElement = document.createElement('script');
      script.setAttribute('src', 'https://js-sandbox.dlocal.com');
      script.onload = () => {
        console.log('loaded dlocal script', window)
      }

      document.head.appendChild(script);
    } catch (error) {
        console.error(error);
    }
  }

  removeScript() {
    document.querySelector('script[src="https://js-sandbox.dlocal.com"]')?.remove()
    console.log('head end', document.head)
  }

  mount(){
    this.dlocalInstance = dlocal(this.smallKey);
    this.fields = this.dlocalInstance.fields({
      locale: 'es',
      country: 'UY'
    });

    this.card = this.fields.create('card', { style: this.style });
    this.mountCard();
  }

  getCardElement() {
    this.element = document.getElementById('card-field')
    return this.element;
  }

  mountCard() {
    // Mounting card element
    this.card.mount(document.getElementById('card-field'))
    // Handling errors
    this.card.addEventListener('change', (event: any) => {
      let displayError = document.getElementById('card-errors');
      if (displayError) {
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      }
    })
  }

  generateToken(cardHolderName: string){
    // const cardHolderName: HtmlE = document.getElementById('card-holder');
    if (cardHolderName) {
      console.log(cardHolderName);
      this.dlocalInstance.createToken(this.card, {
        name: cardHolderName,
        currency: 'UYU'
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch(() => {
        console.log('Error creating token');
      });
    }
  }

  getMethods() {
    return this.httpClient.get(this.methodsUrl);
  }

  
}
