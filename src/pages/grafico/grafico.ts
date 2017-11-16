import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { GraficoSQLite } from '../../sqlite/grafico/grafico';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { GraficoModalPage } from '../../pages/grafico-modal/grafico-modal';

import { GraficoProvider } from '../../providers/grafico/grafico';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {

  data: any = [];
  dataGrafico: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public graficoProvider: GraficoProvider, public graficoSQLite: GraficoSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
  	this.select();
  }

  ionViewDidLoad() {}

  select() {
    this.graficoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM grafico', []).then(
      result => {
      	this.data = this.util.toArray(result);
        this.dataGrafico = this.util.toArray(result)
          .filter((elem, index, arr) => arr.map(obj => obj['id_sessao']).indexOf(elem['id_sessao']) === index);
      });
    });
  }

  selectPerguntas(item) {
    return this.data.filter((elem, index, arr) => 
      arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index && elem.id_sessao === item.id_sessao);
  }

  modal(item) {
    const modal = this.modalCtrl.create(GraficoModalPage, {item : item});
    modal.present();
  }

   doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.graficoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.graficoSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM grafico', {}).then(
              () => {
                this.graficoSQLite.insertAll(data);
                this.select();
                setTimeout(() => { event.complete() }, 2000)
            })
          })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
