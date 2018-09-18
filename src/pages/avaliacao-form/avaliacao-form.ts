import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AvaliacaoFormProvider } from '../../providers/avaliacao-form/avaliacao-form';
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

  data: any = [];
  dataAvaliacao: any = [];
  dataPergunta: any = [];
  buttonDisabled: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public avaliacaoFormProvider: AvaliacaoFormProvider,
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
      .filter((elem, index, arr) => arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index && elem.id_tipo_pergunta != 4).map(obj => ({...obj, resposta: []}));
  }

  selectOpcoes(id_pergunta) {
    return this.data.filter((elem, index, arr) => elem.id_pergunta == id_pergunta);
  }

  doCreate() {
    
    if (this.util.checkNetwork()) {
      const items = this.dataPergunta.map(obj => ({[obj.id_pergunta]: obj.resposta}));
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

  save(){
    this.buttonDisabled = true;
    const items = this.dataPergunta.map(obj => ({ id_pergunta: obj.id_pergunta, id_tipo_pergunta: obj.id_tipo_pergunta, resposta: Array.isArray(obj.resposta) ? this.util.serialize(Object.keys(obj.resposta).filter(e => obj.resposta[e] === true)) : obj.resposta }));     
    let now = new Date();
    let proxima_avaliacao = new Date();
    proxima_avaliacao.setMonth(now.getMonth()+2)

    const avaliacao = {
      id_avaliacao: this.id_avaliacao,
      id_avaliacao_aluno:0,
      id_aluno: this.util.getStorage('id_aluno'),
      id_usuario: this.util.getStorage('id_usuario'),
      descricao: 'Avaliação '+now.toISOString().substr(0, 10).split('-').reverse().join('/'),
      proxima_avaliacao: proxima_avaliacao.toISOString().substr(0, 10),
      respostas: items
    }

    if (this.util.checkNetwork()) {
      this.avaliacaoFormProvider.save(avaliacao).subscribe(
        data => {
          if (data['_body']==1) {
            this.util.showAlert('Atenção', 'Avaliação salva.', 'Ok', true);
            this.navCtrl.pop();
          } else {
            this.util.showAlert('Atenção', 'Erro ao salvar. Tente mais tarde.', 'Ok', true);
          }
      });;
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  fileUpload($event) {

  }

}
