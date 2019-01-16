import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageLoader } from 'ionic-image-loader';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-avaliacao-view',
  templateUrl: 'avaliacao-view.html',
})
export class AvaliacaoViewPage {

  data: any = [];
  dataSessoes: any = [];
  dataAvaliacoes: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public avaliacaoProvider: AvaliacaoProvider,
    public iab: InAppBrowser,
    public util: Util,
    public file: File,
    public transfer: FileTransfer,
    public platform: Platform,
    public layout: Layout) {
      this.data = this.navParams.get('item');
      this.dataAvaliacoes = this.util.getStorage('dataAvaliacao');
    }

  ionViewDidLoad() {
    this.select(this.dataAvaliacoes);
  }

  select(result) {
    this.dataAvaliacoes = result
      .filter((elem, index, arr) => elem.id === this.data.id && elem.resposta !== '');
    this.dataSessoes = this.dataAvaliacoes
      .filter((elem, index, arr) => arr.map(obj => obj['id_sessao']).indexOf(elem['id_sessao']) === index);
    this.data = this.dataAvaliacoes[0];
  }

  selectPerguntas(item) {
    return this.dataAvaliacoes.filter((elem) => elem.id_sessao === item.id_sessao && elem.resposta != "");
  }

  isAnswered(item){
    if(item.resposta=='' || item.resposta=='a:0:{}'){
      return false;
    }
    return true;
  }

  show(item) {
    if(item.id_tipo_pergunta !== '3' && item.id_tipo_pergunta !== '4')
      return true;

    return false;
  }

  isMultiplaEscolha(item) {
    if (item.id_tipo_pergunta === '3')
      return true;

    return false;
  }

  isUpload(item) {
    if (item.id_tipo_pergunta === '4')
      return true;

    return false;
  }

  unserializeToText(item) {
    var arr = this.util.unserialize(item.resposta);

    var str = arr.reduce(function(prevVal, elem) {
      return prevVal + elem + ', '
    }, '');

    return str.slice(0, -2);
  }

  unserializeToUpload(item) {
    return this.util.unserialize(item.resposta)[0];
  }

  isPDF(item) {
    if(item.resposta.indexOf('pdf') !== -1)
      return true;

    return false;
  }

  link(item) {
    if (this.platform.is('ios')) {
      this.iab.create(this.util.baseUrl + '/imgs-avaliacao/' + this.unserializeToUpload(item)).show();
    } else if (this.platform.is('android')) {
      this.iab.create('https://docs.google.com/gview?embedded=false&url='+this.util.baseUrl + '/imgs-avaliacao/' + this.unserializeToUpload(item)).show();
    }
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.util.setStorage('dataAvaliacao', data);
          this.select(data);
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete() }, 2000);
  }

}
