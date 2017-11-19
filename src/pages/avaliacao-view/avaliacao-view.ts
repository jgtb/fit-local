import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AvaliacaoSQLite } from '../../sqlite/avaliacao/avaliacao';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public avaliacaoProvider: AvaliacaoProvider, public avaliacaoSQLite: AvaliacaoSQLite, public iab: InAppBrowser, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.data = this.navParams.get('item');
    this.select();
  }

  ionViewDidLoad() {}

  select() {
    this.avaliacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM avaliacao WHERE id = ' + this.data.id + '', []).then(
      result => {
        this.dataAvaliacoes = this.util.toArray(result);
        this.dataSessoes = this.util.toArray(result)
          .filter((elem, index, arr) => arr.map(obj => obj['id_sessao']).indexOf(elem['id_sessao']) === index);
      });
    });
  }

  selectPerguntas(item) {
    return this.dataAvaliacoes.filter((elem) => elem.id_sessao === item.id_sessao && elem.resposta != "");
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
      return prevVal + elem + ', ';
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
    this.iab.create(this.util.baseUrl + '/imgs-avaliacao/' + this.unserializeToUpload(item)).show();
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.avaliacaoSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM avaliacao', {}).then(
              () => {
                this.avaliacaoSQLite.insertAll(data);
                this.select();
            })
          })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete() }, 2000)
  }

}
