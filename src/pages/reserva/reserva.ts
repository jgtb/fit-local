import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { ReservaSQLite } from '../../sqlite/reserva/reserva';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { ReservaProvider } from '../../providers/reserva/reserva';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  data: any = [];

  _toggle = 1;

  eventSource;
  title;

  calendar = {
    mode: 'month',
    locale: 'pt-BR',
    noEventsLabel: 'Nenhuma Reserva',
    currentDate: new Date(),
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public reservaProvider: ReservaProvider, public reservaSQLite: ReservaSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.select();
  }

  ionViewDidLoad() {}

  select() {
    this.reservaSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM reserva', []).then(
      result => {
        this.data = this.util.toArray(result);
        this.eventSource = this.loadReservas();
      });
    });
  }

  loadReservas() {
    let arr = [];

    for (let i = 0; i < this.data.length; i++) {

      arr.push({
          title: this.data[i].title,
          allDay: false
      });
    }

    return arr;
  }

  onViewTitleChanged(title) {
    if (this.calendar.mode == 'week') {
      this.title = title.split(',')[0];
    } else {
      this.title = title;
    }
  }

  onEventSelected(event) {}

  toggle() {
    this._toggle++;

    if (this._toggle > 3) this._toggle = 1;

    switch(this._toggle) {
        case 1:
            this.calendar.mode = 'month';
        break;
        case 2:
            this.calendar.mode = 'week';
        break;
        case 3:
            this.calendar.mode = 'day';
        break;
    }
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.reservaProvider.index(this.util.getStorage('id_professor')).subscribe(
        data => {
          this.reservaSQLite.startDatabase().then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM reserva', {}).then(
              () => {
                this.reservaSQLite.insertAll(data);
                this.select();
            })
          })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
