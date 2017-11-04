import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLiteObject } from '@ionic-native/sqlite';

import { TreinoSQLite } from '../../sqlite/treino/treino';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})
export class TreinoPage {

  data: any = [];

  _toggle = 1;

  eventSource;
  title;

  calendar = {
    mode: 'month',
    locale: 'pt-BR',
    noEventsLabel: 'Nenhum Treino',
    currentDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function(date) {
            return 'MonMH';
        },
        formatMonthViewTitle: function(date) {
            return 'testMT';
        },
        formatWeekViewDayHeader: function(date) {
            return 'MonWH';
        },
        formatWeekViewTitle: function(date) {
            return 'testWT';
        },
        formatWeekViewHourColumn: function(date) {
            return 'testWH';
        },
        formatDayViewHourColumn: function(date) {
            return 'testDH';
        },
        formatDayViewTitle: function(date) {
            return 'testDT';
        }
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public treinoSQLite: TreinoSQLite, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  select() {
    this.treinoSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM treino', []).then(
      result => {
        this.data = this.util.toArray(result);
        this.loadTreinos();
      });
    });
  }

  loadTreinos() {
    let arr = [];

    for (let i = 0; i < this.data.length; i++) {

      let title = this.data[i]['title'];
      let startTime = new Date(this.data[i]['start']);
      let endTime = new Date(this.data[i]['end']);

      arr.push({
          title: title,
          startTime: startTime,
          endTime: endTime,
          allDay: false
      });
    }

    return arr;
  }

  goToDashboard() {
      this.navCtrl.push(DashboardPage);
  }

  onViewTitleChanged(title) {
    if (this.calendar.mode == 'week') {
      this.title = title.split(',')[0];
    } else {
      this.title = title;
    }
  }

  onEventSelected(event) {

  }

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

}
