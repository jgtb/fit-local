import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TreinoTimerPage } from '../../pages/treino-timer/treino-timer';

import { Observable } from 'rxjs/Rx';

import { SQLiteObject } from '@ionic-native/sqlite';

import { SerieSQLite } from '../../sqlite/serie/serie';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-treino-form',
  templateUrl: 'treino-form.html',
})
export class TreinoFormPage {

  data: any = [];
  dataExercicios: any = [];

  _toggle: boolean = true;

  subscription;
  _timer = 0;
  running = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serieSQLite: SerieSQLite, public util: Util) {}

  ionViewDidEnter() {
    this.data = this.navParams.get('item');
    this.select();
  }

  ionViewDidLoad() {}

  create() {
    const title = 'Finalizar Treino';
    const inputs = [
      {
        name: 'comentario',
        placeholder: ''
      }
    ];
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          if (this.util.checkNetwork()) {

          } else {
            this.util.showAlert('Atenção', 'Internet Offline', 'Ok');
          }
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, inputs, buttons);
  }

  update(item) {
    const title = item.descricao_ex;
    const inputs = [
      {
        name: 'carga',
        value: item.carga,
        placeholder: 'Carga'
      }
    ];
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          if (this.util.checkNetwork()) {

          } else {
            this.util.showAlert('Atenção', 'Internet Offline', 'Ok');
          }
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, inputs, buttons);
  }

  start() {
    this.running = true;
    this.subscription = Observable.interval(1000).subscribe(data => {
      this._timer++;
      this.time();
    });
  }

  stop() {
    this.running = false;
    this.subscription.unsubscribe ();
  }

  time() {
    var totalSeconds = this._timer;
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    seconds = Math.round(seconds * 100) / 100

    var result = (hours < 10 ? "0" + hours : hours);
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds  < 10 ? "0" + seconds : seconds);

    return result;
  }

  timer(item) {
    this.navCtrl.push(TreinoTimerPage, { item: item });
  }

  select() {
    this.serieSQLite.startDatabase().then((db: SQLiteObject) => { db.executeSql('SELECT * FROM serie WHERE id = ' + this.data.id + '', []).then(
      result => {
        for (var i = 0; i < result.rows.length; i++) {
          this.dataExercicios.push(result.rows.item(i));
        }
      });
    });
  }

  toggle() {
    this._toggle = !this._toggle;
  }

}
