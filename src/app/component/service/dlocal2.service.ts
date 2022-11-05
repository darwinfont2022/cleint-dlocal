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
    this.expiration = this.fields.create('expiration', { style: this.style });
    this.cvv = this.fields.create('cvv', { style: this.style});
  }

  mount(){
    this.mountCard();
    this.mountExpiation();
    this.mountCvv();
  }

  mountExpiation(){
    this.expiration.mount(document.getElementById('expiration'))
  }

  mountCvv(){
    this.cvv.mount(document.getElementById('cvv'))
  }

  getCardElement() {
    this.element = document.getElementById('card-field')
    return this.element;
  }

  mountCard() {
    this.card.mount(document.getElementById('card-field'))
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
    this.card.on('brand', (event: any) => {
      this.dlocalInstance.createInstallmentsPlan(this.card, 1000, 'UYU')
        .then((response: any) => {
          const installmentsSelect = document.getElementById('');
          this.buildInstallments(installmentsSelect, response.installments);   
        })
        .catch(() =>{
          console.log('Error creating installments plan');
          
        });
    })
  }

  buildInstallments(installmentsInput:any, installmentsPlan:any) {
    const installmentsOptions = installmentsPlan.installments.reduce(function (options: any, plan: any) {
            options += "<option value=" + plan.id + ">" + plan.installments + " of " + "currency" + " " + plan.installment_amount + " (Total : " + "currency" + " " + plan.total_amount + ")</option>";
            return options;
    }, "");
    installmentsInput.disabled = false;
    installmentsInput.innerHTML = installmentsOptions;
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
