import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from, merge, mergeAll, every, scan } from 'rxjs';

import { DLocalService } from '../../service/dlocal/dlocal2.service';
import { ApiService } from '../../service/api-service/api.service';
import { Subscription } from 'rxjs';
import { Settings } from '../../model/DlocalSettings';
import { Method } from '../../model/Methods';
import { Field } from 'src/app/service/dlocal/model/field';

@Component({
  selector: 'app-small-fields',
  templateUrl: './small-fields.component.html',
  styleUrls: ['./small-fields.component.scss']
})
export class SmallFieldsComponent implements OnInit, OnDestroy {

  public form = new FormGroup({
    cardHolderName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    document: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  public completed: number[];// Control completed fields
  private valid: any = {};
  public methods: Method[] = [];
  private pan: Field = {} as Field;
  private expiration: Field = {} as Field;
  private cvv: Field = {} as Field;

  private subscriptions = new Subscription()

  private style: Settings = {
    style: {
      base: {
        fontSize: '16px',
      }
    },
    classes: {
      empty: 'border rounded border-primary p-1',
      invalid: 'border border-danger rounded',
    }
  }
private flag = false;
  constructor(
    private dlocalService: DLocalService,
    private apiService: ApiService,
  ) {
    this.completed = [];
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.dlocalService.init().subscribe((res) => {
        this.panConfig();
        this.expirationConfig();
        this.cvvConfig();
        this.isValid();
      })); 

      this.subscriptions.add(this.apiService.getMethods({country: 'UY', type: 'CARD'}).subscribe((methods: any) => {
        this.methods = methods;
      })); 
  }

  ngOnDestroy(): void {
    this.dlocalService.removeScript();
    this.pan.unmount();
    this.expiration.unmount();
    this.cvv.unmount();
    this.subscriptions.unsubscribe();
  }

  isValid(): boolean {
    //const all = this.valid.every((v) => v.complete && !v.error)
    console.log(this.valid)
    return this.valid.pan && this.valid.expiration && this.valid.cvv ? true : false
  }

  pay() {
    if(this.form.valid && this.isValid()) {
      console.log('Completed is true')
    } else {
      console.log('Form is invalid')
    }
    console.log(this.valid)
  }

  panConfig() {
    this.pan = this.dlocalService.mountField('pan', 'panField', this.style, 'card-error');

    this.subscriptions.add(
      this.pan.onChange.subscribe((event: any) => {
        if(!event.error && event.complete){
          this.valid.pan = true;
        } else {
          this.valid.pan = false;
        }
      })
    );

    this.subscriptions.add(
      this.pan.onComplete.subscribe((pan: any) => {
        if(!pan.error){
          this.expiration.focus();
        }
      })
    );

    this.subscriptions.add(
      this.pan.onBrand.subscribe((brand: any) => {
        const currentLogo = this.methods.find(method => method.name.toLowerCase() === brand.brand.toLowerCase())
        this.methods = [currentLogo || {} as Method]
      })
    );
  }

  expirationConfig() {    
    this.expiration = this.dlocalService.mountField('expiration', 'expirationField', this.style, 'card-error');

    this.subscriptions.add(
      this.expiration.onComplete.subscribe((exp: any) => {
      if(!exp.error) {
        this.completed.push(1);
        this.cvv.focus();
      }
    }));

    this.subscriptions.add(
      this.expiration.onChange.subscribe((event: any) => {
        if(!event.error && event.complete) {
          this.valid.expiration = true;
        } else {
          this.valid.expiration = false;
        }
      })
    )
  }

  cvvConfig() {
    this.cvv = this.dlocalService.mountField('cvv', 'cvvField', this.style, 'card-error');

    this.subscriptions.add(
      this.cvv.onChange.subscribe((event: any) => {
        if(!event.error && event.complete){
          this.valid.cvv = true;
        } else {
          this.valid.cvv = false;
        }
      })
    )

    this.subscriptions.add(this.cvv.onComplete.subscribe((res: any) => {
      this.cvv.createToken('Darw', 'UYU').subscribe((res: any) => {
        console.log("CVV Token")
        this.completed.push(1);
      }, (error: any) => {
        console.log(error);
      });

      this.pan.createToken('Darw', 'UYU').subscribe((res: any) => {
        //console.log("CVV Pan",res)
      }, (error: any) => {
        //console.log(error);
      });
    }));
  }
}
