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
      let comentario = obj.comentario

      let startTime = new Date(start.replace(/-/g, "/"))
      let endTime = new Date(end.replace(/-/g, "/"))

      return {
        title: title,
        startTime: startTime,
        endTime: endTime,
        borg: borg,
        comentario: comentario,
        allDay: false
      }
    })
  }

  onViewTitleChanged(title) {
    this.title = title
  }

  onEventSelected(event) {
    const title = event.title
    const subtitle = this.getSubtitle(event)
    const button = 'Ok'

    this.util.showAlert(title, subtitle, button , true)
  }

  getSubtitle(event) {
    let time = 'Tempo: ' + this.time(event.startTime, event.endTime)
    let img = event.borg !== null ? '<img src="assets/img/treino-modal/' + event.borg + '.png">' : ''
    let comentario = event.comentario

    return time + img + comentario
  }

  time(startTime, endTime) {
    const date = new Date(null)
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000

    date.setSeconds(seconds)

    const result = date.toISOString().substr(11, 8)

    return result
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
