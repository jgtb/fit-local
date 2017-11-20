import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { SQLiteObject } from '@ionic-native/sqlite'

import { AvaliacaoSQLite } from '../../sqlite/avaliacao/avaliacao'

import { DashboardPage } from '../../pages/dashboard/dashboard'
import { AvaliacaoViewPage } from '../../pages/avaliacao-view/avaliacao-view'

import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  data: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public avaliacaoProvider: AvaliacaoProvider, public avaliacaoSQLite: AvaliacaoSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.select()
  }

  ionViewDidLoad() {
     this.select()
  }
  
  select() {
    this.avaliacaoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM avaliacao', []).then(
      result => {
        this.data = this.util.toArray(result)
          .filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index)
      });
    });
  }

  view(item) {
    this.navCtrl.push(AvaliacaoViewPage, { item: item })
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.avaliacaoSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM avaliacao', {}).then(
              () => {
                this.avaliacaoSQLite.insertAll(data)
                this.select()
            })
          })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage)
  }

}
