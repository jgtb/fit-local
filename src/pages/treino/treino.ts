import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

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
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public treinoProvider: TreinoProvider, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.select()
    this.eventSource = this.loadTreinos()
  }

  select() {
    this.data = this.util.getStorage('dataTreino')
  }

  loadTreinos() {
    return this.data.map(obj => {
      let title = obj.title
      let start = obj.start
      let end = obj.end
      let borg = obj.borg

      let startTime = new Date(start.replace(/-/g, "/"))
      let endTime = new Date(end.replace(/-/g, "/"))

      return {
        title: title,
        startTime: startTime,
        endTime: endTime,
        borg: borg,
        allDay: false
      }
    })
  }

  onViewTitleChanged(title) {
    if (this.calendar.mode == 'week') {
      this.title = title.split(',')[0]
    } else {
      this.title = title
    }
  }

  onEventSelected(event) {
    const title = event.title
    const subtitle = 'Tempo: ' + this.time(event.startTime, event.endTime) + '<br />' + this.getResultado(event.borg)
    const button = 'Ok'

    this.util.showAlert(title, subtitle, button , true)
  }

  time(startTime, endTime) {
    const date = new Date(null)
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000

    date.setSeconds(seconds)

    const result = date.toISOString().substr(11, 8)

    return result
  }

  getResultado(index) {
    const result = ['Muito Bom', 'Bom', 'Mediano', 'Regular', 'Ruim', 'Muito Ruim']

    return result[index]
  }

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
          this.select()
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
