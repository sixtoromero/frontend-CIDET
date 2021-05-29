import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { MunicipioModel } from 'src/app/models/municipio.model';
import { DepartamentoModel } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [MunicipiosService, DepartamentosService, GeneralService, MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {

  stateOptions: any[];

  msgs: Message[] = [];
  results: MunicipioModel[] = [];  
  deptos: DepartamentoModel[] = [];  

  selmunicipio: MunicipioModel;
  displayModal: boolean = false;
  isNew: boolean = true;
  
  public myForm: FormGroup  = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipiosService,
    private departamentoService: DepartamentosService,
    private general: GeneralService,
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) { 

    this.stateOptions = [{label: 'No', value: 'false'}, {label: 'Si', value: 'true'}];

    this.myForm = fb.group({
      Nombre: ['', [Validators.required]],
      DepartamentoId: ['', [Validators.required]],
      CodigoDANE: ['', [Validators.required]],
      EsDistritoOpt: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {    
    this.getMunicipiosAll();
    this.getDepartamentosAll();
  }

  get f() {
    return this.myForm.controls;
  }

  insertOrupdate(){
    if (this.isNew){
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    
    this.ngxService.start();
    const model = this.prepareSave();    
    debugger;
    model.EsDistrito = model.EsDistritoOpt.value === "true" ? true : false;

    model.Id = 0;
    this.municipioService.insert(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){        
        this.displayModal = false; 
        this.getMunicipiosAll();
        this.general.showSuccess('registrado exitosamente');
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  update() {
    this.ngxService.start();
    const model = this.prepareSave();    
    model.EsDistrito = model.EsDistritoOpt.value === "true" ? true : false;
    model.Id = this.selmunicipio.Id;
    this.municipioService.update(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){        
        this.displayModal = false;         
        this.getMunicipiosAll();
        this.general.showSuccess('Actualizado exitosamente');        
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  getMunicipiosAll() {
    this.ngxService.start();
    this.municipioService.getMunicipiosAll()
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {
        this.results = response["Data"] as MunicipioModel[];
      }
    }, error => {
      this.ngxService.stop();
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  getDepartamentosAll() {
    this.ngxService.start();
    this.departamentoService.getDepartamentosAll()
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {
        this.deptos = response["Data"] as DepartamentoModel[];
      }
    }, error => {
      this.ngxService.stop();
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  

  deleteMunicipios(Id: number){
    this.ngxService.start();
    this.municipioService.delete(Id)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {      
      if (response["IsSuccess"]) {        
        this.general.showSuccess("Se ha eliminado el registro correctamente.");
        this.getMunicipiosAll();
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  confirmDelete(Id: number) {
    this.confirmationService.confirm({
        message: 'Está seguro de eliminar el registro seleccionado?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteMunicipios(Id);
        }
    });
  }

  editModal(item: MunicipioModel) {        

    this.f.Nombre.setValue(item.Nombre);
    this.f.DepartamentoId.setValue(item.DepartamentoId);
    this.f.CodigoDANE.setValue(item.CodigoDANE);        
    this.f.EsDistritoOpt.setValue(item.EsDistrito === true ? {label: 'Si', value: 'true'} : {label: 'No', value: 'false'});

    this.selmunicipio = item;
    this.displayModal = true;
    this.isNew = false;

  }

  private prepareSave(): MunicipioModel {

    return new MunicipioModel().deserialize(this.myForm.value);
  }

}
