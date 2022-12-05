import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DLocalService } from '../../service/dlocal/dlocal2.service';

@Component({
  selector: 'app-small-fields',
  templateUrl: './small-fields.component.html',
  styleUrls: ['./small-fields.component.scss']
})
export class SmallFieldsComponent implements OnInit, OnDestroy {

  public form = new FormGroup({
    cardHolderName: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private dlocalService: DLocalService) { }

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {

  }

  pay(){
    this.dlocalService.removeScript()
  }
}
