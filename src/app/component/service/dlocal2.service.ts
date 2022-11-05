import { Injectable } from '@angular/core';

declare let dlocal: any;

@Injectable({
  providedIn: 'root'
})
export class DLocal2Service {

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

  dlocalInstance: any;

  element: any;

  constructor() {
    this.dlocalInstance = dlocal('db252d4e-4617-48b2-b946-5d5f39cfbcb9')
    this.fields = this.dlocalInstance.fields({
      locale: 'es',
      country: 'UY'
    });

    this.card = this.fields.create('card', { style: this.style });
  }

  mount(){
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
}
