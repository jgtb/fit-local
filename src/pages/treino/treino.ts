import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { SQLiteObject } from '@ionic-native/sqlite'

import { TreinoSQLite } from '../../sqlite/treino/treino'

import { DashboardPage } from '../../pages/dashboard/dashboard'

import { TreinoProvider } from '../../providers/treino/treino'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  data: any = []

  _toggle: any = 1

  eventSource: any
  title: any

  calendar = {
    mode: 'month',
    locale: 'pt-BR',
    noEventsLabel: 'Nenhum Treino',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public treinoProvider: TreinoProvider, public treinoSQLite: TreinoSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.select()
  }

  select() {
    this.treinoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM treino', []).then(
      result => {
        this.data = this.util.toArray(result)
        this.eventSource = this.loadTreinos()
      });
    });
  }

  loadTreinos() {
    let arr = []

    for (let i = 0; i < this.data.length; i++) {

      let title = this.data[i]['title']
      let startTime = this.data[i]['start']
      let endTime = this.data[i]['end']

      arr.push({
          title: title,
          //startTime: startTime,
          //endTime: endTime,
          allDay: false
      })
    }

    return arr
  }

  onViewTitleChanged(title) {
    if (this.calendar.mode == 'week') {
      this.title = title.split(',')[0]
    } else {
      this.title = title
    }
  }

  onEventSelected(event) {}

  toggle() {
    this._toggle++

    if (this._toggle > 3) this._toggle = 1

    switch(this._toggle) {
        case 1:
            this.calendar.mode = 'month'
        break
        case 2:
            this.calendar.mode = 'week'
        break
        case 3:
            this.calendar.mode = 'day'
        break
    }
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.treinoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.treinoSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM treino', {}).then(
              () => {
                this.treinoSQLite.insertAll(data)
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
