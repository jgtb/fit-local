import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { DashboardPage } from '../../pages/dashboard/dashboard'

import { ReservaProvider } from '../../providers/reserva/reserva'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  data: any = []

  _toggle: any = 1

  eventSource: any
  title: any

  calendar = {
    mode: 'month',
    locale: 'pt-BR',
    noEventsLabel: 'Nenhuma Reserva',
    currentDate: new Date(),
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public reservaProvider: ReservaProvider, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.select()
  }

  select() {
    this.data = this.util.getStorage('dataReserva')
    this.eventSource = this.loadReservas()
  }

  loadReservas() {
    let arr = []

    for (let i = 0; i < this.data.length; i++) {

      let title = this.data[i].title
      let start = this.data[i]['start']
      let end = this.data[i]['end']

      let startTime = new Date(start);
      let endTime = new Date(end);

      arr.push({
          title: title,
          startTime: startTime,
          endTime: endTime,
          allDay: false
      })
    }

    return arr
  }

  onEventSelected(event) {
    const title = event.title
    const message = this.getMessage(event)
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, message, [], buttons, true)
  }

  getMessage(event) {
    const startTime = event.startTime.toTimeString().split(' ')[0]
    const endTime = event.endTime.toTimeString().split(' ')[0]

    const message = 'Deseja reservar esta aula ?' + '<br />' + startTime + ' - ' + endTime

    return message
  }

  onViewTitleChanged(title) {
    if (this.calendar.mode == 'week') {
      this.title = title.split(',')[0]
    } else {
      this.title = title
    }
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
      this.reservaProvider.index(this.util.getStorage('id_professor')).subscribe(
        data => {
          this.select()
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage)
  }

}
