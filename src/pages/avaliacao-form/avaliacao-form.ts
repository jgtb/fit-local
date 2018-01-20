import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-avaliacao-form',
  templateUrl: 'avaliacao-form.html'
})
export class AvaliacaoFormPage {

  @ViewChild('fileInp') fileInput: ElementRef;

  id_avaliacao: any;
  items: any = [];

  data: any = [];
  dataAvaliacao: any = [];
  dataPergunta: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataAvaliacaoForm');
    }

  ionViewDidLoad() {
    this.select(this.data);
  }

  select(result) {
    this.dataAvaliacao = result.filter((elem, index, arr) => arr.map(obj => obj.id_avaliacao).indexOf(elem.id_avaliacao) === index);
  }

  selectPerguntas() {
    this.dataPergunta = this.data.filter((elem, index, arr) => elem.id_avaliacao === this.id_avaliacao && elem.id_sessao != 1 && elem.id_sessao != 2 && elem.id_sessao != 3)
      .filter((elem, index, arr) => arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index);
  }

  selectOpcoes(id_pergunta) {
    return this.data.filter((elem, index, arr) => elem.id_pergunta == id_pergunta);
  }

  doCreate() {
    if (this.util.checkNetwork()) {
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  isTipoPergunta(id_tipo_pergunta, key) {
    return id_tipo_pergunta == key;
  }

  upload() {
    this.fileInput.nativeElement.click();
  }

  fileUpload($event) {

  }

}
