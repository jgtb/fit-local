import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { SerieSQLite } from '../../sqlite/serie/serie';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TreinoFormPage } from '../../pages/treino-form/treino-form';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  data: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public serieSQLite: SerieSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.select();
  }

  ionViewDidLoad() {}

  select() {
    this.serieSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM serie', []).then(
      result => {
        this.data = this.util.toArray(result).filter((elem, index, arr) => {
          return arr.map(obj => obj['id']).indexOf(elem['id']) === index;
        });
      });
    });
  }

  create(item) {
    this.navCtrl.push(TreinoFormPage, {item: item});
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
