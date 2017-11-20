import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { SQLiteObject } from '@ionic-native/sqlite'

import { SerieSQLite } from '../../sqlite/serie/serie'

import { DashboardPage } from '../../pages/dashboard/dashboard'
import { TreinoFormPage } from '../../pages/treino-form/treino-form'

import { SerieProvider } from '../../providers/serie/serie'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  data: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public serieProvider: SerieProvider, 
    public serieSQLite: SerieSQLite, 
    public util: Util, 
    public layout: Layout) {}

  ionViewDidEnter() {
    this.select()
  }

  ionViewDidLoad() {
    this.select()
  }

  select() {
    this.serieSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM serie', []).then(
      result => {
        this.data = this.util.toArray(result).filter((elem, index, arr) => {
          return arr.map(obj => obj['id']).indexOf(elem['id']) === index
        })
      })
    })
  }

  create(item) {
    this.navCtrl.push(TreinoFormPage, {item: item})
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.serieProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.serieSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM serie', {}).then(
              () => {
                this.serieSQLite.insertAll(data)
                this.select()
            })
          })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage)
  }

}
