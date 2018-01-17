import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-avaliacao-form',
  templateUrl: 'avaliacao-form.html'
})
export class AvaliacaoFormPage {

  @ViewChild('fileInp') fileInput: ElementRef;

  form: FormGroup;

  data: any = [];
  dataAvaliacao: any = [];
  dataPergunta: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public util: Util,
    public layout: Layout) {
      this.initForm();
      this.data = this.util.getStorage('dataAvaliacaoForm');
    }

  ionViewDidLoad() {
    this.select(this.data);
  }

  initForm() {
    this.form = this.formBuilder.group({
      id_avaliacao: ['', Validators.required],
      descricao: ['', Validators.required],
      data: [new Date().toISOString(), Validators.required]
    });
  }

  select(result) {
    this.dataAvaliacao = result.filter((elem, index, arr) => arr.map(obj => obj.id_avaliacao).indexOf(elem.id_avaliacao) === index && elem.id_avaliacao != 1);
  }

  selectPerguntas() {
    this.dataPergunta = this.data.filter((elem, index, arr) => elem.id_avaliacao === this.form.value.id_avaliacao && elem.id_sessao != 1 && elem.id_sessao != 2 && elem.id_sessao != 3)
      .filter((elem, index, arr) => arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index);
  }

  selectOpcoes(item) {
    return this.data.filter((elem, index, arr) => elem.id_pergunta == item.id_pergunta);
  }

  doCreate(form) {
    if (this.util.checkNetwork()) {
      if (form.valid) {
        const data = form.value;
      } else {
        this.util.showAlert('Atenção', 'Formulário inválido!', 'Ok', true);
      }
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  isTipoPergunta(item, key) {
    return item.id_tipo_pergunta == key;
  }

  upload() {
    this.fileInput.nativeElement.click();
  }

  fileUpload($event) {

  }

  setRadioValue(value, index) {

  }

}
