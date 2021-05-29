import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})
export class MunicipiosComponent implements OnInit {

  public myForm: FormGroup  = new FormGroup({});
  stateOptions: any[];

  constructor(
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private general: GeneralService
  ) {
    this.stateOptions = [{label: 'No', value: 'false'}, {label: 'Si', value: 'true'}];

    this.myForm = fb.group({
      Nombre: ['', [Validators.required]],
      DepartamentoId: ['', [Validators.required]],
      CodigoDANE: ['', [Validators.required]],
      EsDistrito: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

  }

  get f() {
    return this.myForm.controls;
  }

  

}
