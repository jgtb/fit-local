import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageLoader } from 'ionic-image-loader';

import { TreinoTimerPage } from '../../pages/treino-timer/treino-timer';
import { TreinoModalPage } from '../../pages/treino-modal/treino-modal';
import { TreinoPage } from '../../pages/treino/treino';

import { TreinoProvider } from '../../providers/treino/treino';
import { SerieProvider } from '../../providers/serie/serie';

import { Observable } from 'rxjs/Rx';

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

  subscription: any;
  _timer = 0;
  running = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public treinoProvider: TreinoProvider,
    public serieProvider: SerieProvider,
    public iab: InAppBrowser,
    public modalCtrl: ModalController,
    public util: Util,
    public layout: Layout) {
      this.data = this.navParams.get('item');
    }

  // ionViewCanLeave() {
  //   if (this._timer > 0) {
  //     return new Promise((resolve, reject) => {
  //       const buttons = [{
  //         text: 'Confirmar',
  //         handler: () => {
  //           resolve()
  //         },
  //       }, {
  //         text: 'Cancelar',
  //         handler: () => {
  //           reject()
  //         }
  //       }]
  //       this.util.showConfirmationAlert('Abandonar treino?', '', '', buttons, true)
  //     })
  //   }
  // }

  ionViewDidLoad() {
    const data = this.util.getStorage('dataSerie');
    this.select(data);
  }

  select(result) {
    this.dataExercicios = result.filter((elem, index, arr) => { return elem.id === this.data.id });
    this.data = this.dataExercicios[0];
  }

  create() {
    const modal = this.modalCtrl.create(TreinoModalPage, {id_serie: this.data.id_serie, time: this.time()});
    modal.present();
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
        handler: dataCarga => {
          this.doUpdate(item, dataCarga)
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
    ];
    this.util.showConfirmationAlert(title, message, inputs, buttons, true);
  }

  doUpdate(item, dataCarga) {
    if (this.util.checkNetwork()) {
      const data = JSON.stringify({id: item.id_exercicio_serie, carga: dataCarga.carga });

      this.serieProvider.updateCarga(data).subscribe(
        data => {
          this.util.showAlert('Atenção', 'Carga Alterada', 'Ok', true);
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  start() {
    this.running = true;
    this.subscription = Observable.interval(1000).subscribe(data => {
      this._timer++;
    })
  }

  stop() {
    if (this._timer > 0) {
      this.running = false;
      this.subscription.unsubscribe();
    }
  }

  time() {
    const date = new Date(null);

    date.setSeconds(this._timer);

    const result = date.toISOString().substr(11, 8);

    return result;
  }

  timer(item) {
    this.navCtrl.push(TreinoTimerPage, { item: item });
  }

  done(index) {
    const pos = this._done.indexOf(index);

    if (pos > -1) {
      this._done.splice(pos, 1);
      return true;
    }

    this._done.push(index);
  }

  isDone(index) {
    const pos = this._done.indexOf(index);

    if (pos > -1)
      return true;

    return false;
  }

  video(item) {
    this.iab.create(item.video).show();
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.serieProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          //this.util.setStorage('dataSerie', data);
          this.select(data);
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete(); }, 2000);
  }

}
