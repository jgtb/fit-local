import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { InformacaoSQLite } from '../../sqlite/informacao/informacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html',
})
export class InformacaoPage {

  tab: string = 'informacao';

  dataInformacao: any = [];
  dataMensagem: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public informacaoSQLite: InformacaoSQLite) {}

  ionViewDidEnter() {
    this.selectInformacao();
    this.selectMensagem();
  }

  ionViewDidLoad() {}

  selectInformacao() {
    this.informacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM informacao', []).then(
      result => {
        for (var i = 0; i < result.rows.length; i++) {
          this.dataInformacao.push(result.rows.item(i));
        }
      });
    });
  }

  selectMensagem() {
    this.informacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM mensagem', []).then(
      result => {
        for (var i = 0; i < result.rows.length; i++) {
          this.dataMensagem.push(result.rows.item(i));
        }
      });
    });
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
