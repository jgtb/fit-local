import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { AvaliacaoSQLite } from '../../sqlite/avaliacao/avaliacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AvaliacaoViewPage } from '../../pages/avaliacao-view/avaliacao-view';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  dataAvaliacao: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public avaliacaoSQLite: AvaliacaoSQLite, public util: Util) {}

  ionViewDidEnter() {
    this.select();
  }

  ionViewDidLoad() {}

  select() {
    this.avaliacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM avaliacao', []).then(
      result => {
        this.dataAvaliacao = this.util.toArray(result)
          .filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
      });
    });
  }

  view(item) {
    this.navCtrl.push(AvaliacaoViewPage, { item: item });
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
