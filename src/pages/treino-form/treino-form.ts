import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TreinoTimerPage } from '../../pages/treino-timer/treino-timer';

import { TreinoProvider } from '../../providers/treino/treino';
import { SerieProvider } from '../../providers/serie/serie';

import { Observable } from 'rxjs/Rx';

import { SQLiteObject } from '@ionic-native/sqlite';

import { SerieSQLite } from '../../sqlite/serie/serie';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino-form',
  templateUrl: 'treino-form.html',
})
export class TreinoFormPage {

  data: any = [];
  dataExercicios: any = [];
  _done: any = [];

  _toggle: boolean = true;

  subscription;
  _timer = 0;
  running = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public treinoProvider: TreinoProvider, public serieProvider: SerieProvider, public serieSQLite: SerieSQLite, public iab: InAppBrowser, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {
    this.data = this.navParams.get('item');
    this.select();
  }

  ionViewDidLoad() {}

  create() {
    const title = 'Finalizar Treino ?';
    const message = 'Tempo: ' + this.time();
    const inputs = this.getInputs();
    const buttons = [
      {
        text: 'Confirmar',
        handler: dataResultado => {
          const _title = 'Algum Comentário ?';
          const _message = message + '<br>' + this.getResultado(dataResultado);
          const _inputs = [
            {
              name: 'comentario',
              placeholder: 'Comentário'
            }
          ];
          const _buttons = [
            {
              text: 'Confirmar',
              handler: dataComentario => {
                this.doCreate(dataResultado, dataComentario);
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel',
            }
          ];
          this.util.showConfirmationAlert(_title, _message, _inputs, _buttons, true);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, message, inputs, buttons, true);
  }

  doCreate(dataResultado, dataComentario) {
    if (this.util.checkNetwork()) {
      const data = JSON.stringify({id_serie: this.data.id_serie, mensagem: dataComentario.comentario, borg: dataResultado, tempo: this.time(), datahora: this.getDateTime()});

      this.treinoProvider.create(data).subscribe(
        data => {
          this.util.showAlert('Atenção', 'Treino Registrado', 'Ok', true);
        },
        err => {
          console.log(err);
          this.util.showAlert('Atenção', 'Erro no Servidor', 'Tente Novamente', true);
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  update(item) {
    const title = item.descricao_ex;
    const message = 'Alterar Carga';
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
          this.doUpdate(item, data);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, message, inputs, buttons, true);
  }

  doUpdate(item, data) {
    if (this.util.checkNetwork()) {
      this.serieProvider.update(data).subscribe(
        data => {
          this.util.showAlert('Atenção', 'Carga Alterada', 'Ok', true);
        },
        err => {
          this.util.showAlert('Atenção', 'Erro no Servidor', 'Tente Novamente', true);
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
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
    let totalSeconds = this._timer;
    let hours   = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    seconds = Math.round(seconds * 100) / 100;

    let result = (hours < 10 ? "0" + hours : hours);
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds  < 10 ? "0" + seconds : seconds);

    return result;
  }

  timer(item) {
    this.navCtrl.push(TreinoTimerPage, { item: item });
  }

  done(index) {
    if (index in this._done) {
      this._done[index].value = !this._done[index].value;
    } else {
      this._done.push({index: index, value: true});
    }
  }

  video(item) {
    this.iab.create(item.video).show();
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

  getInputs() {
    const inputs = [
      {
        name: 'resultado',
        type: 'radio',
        label: 'Muito Bom',
        value: 0,
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Bom',
        value: "1",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Mediano',
        value: "2",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Regular',
        value: "3",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Ruim',
        value: "4",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Muito Ruim',
        value: "5",
      }
    ];

    return inputs;
  }

  getResultado(index) {
    let data = ['Muito Bom', 'Bom', 'Mediano', 'Regular', 'Ruim', 'Muito Ruim'];

    return data[index];
  }

  getDateTime() {
    let date = new Date();

    return date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
  }

}
