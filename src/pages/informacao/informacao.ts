import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { InformacaoSQLite } from '../../sqlite/informacao/informacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html',
})
export class InformacaoPage {

  title: string = '';

  tab: string = 'informacao';

  dataInformacao: any = [];
  dataMensagem: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public informacaoSQLite: InformacaoSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.selectInformacao();
    this.selectMensagem();
  }

  ionViewDidLoad() {}

  selectInformacao() {
    this.informacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM informacao', []).then(
      result => {
        this.title = result.rows.item(0).nome;
        this.dataInformacao = this.util.toArray(result);
      });
    });
  }

  selectMensagem() {
    this.informacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM mensagem', []).then(
      result => {
        this.dataMensagem = this.util.toArray(result);
      });
    });
  }

  showImg(item) {
    if (item.largura != "" && item.altura != "")
       return true;

     return false;
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
