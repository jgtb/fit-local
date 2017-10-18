import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { AvaliacaoSQLite } from '../../sqlite/avaliacao/avaliacao';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-avaliacao-view',
  templateUrl: 'avaliacao-view.html',
})
export class AvaliacaoViewPage {

  data: any = [];
  dataSessoes: any = [];
  dataAvaliacoes: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public avaliacaoSQLite: AvaliacaoSQLite, public util: Util) {}

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
    return this.dataAvaliacoes.filter((elem) => elem.id_sessao == item.id_sessao);
  }

  show(item) {
    if(item.id_sessao != 1 && item.id_sessao != 2 && item.id_sessao != 3 && item.id_tipo_pergunta != 5 && item.id_tipo_pergunta != 4)
      return true;

    return false;
  }

}
