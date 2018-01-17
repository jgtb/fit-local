import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ModalController, Navbar} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageLoader } from 'ionic-image-loader';

import { TreinoTimerPage } from '../../pages/treino-timer/treino-timer';
import { TreinoModalPage } from '../../pages/treino-modal/treino-modal';

import { SerieProvider } from '../../providers/serie/serie';

import { Observable } from 'rxjs/Rx';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html',
})

export class TreinoPage {

  @ViewChild(Navbar) navBar: Navbar;

  data: any = [];
  dataExercicios: any = [];

  _done: any = [];
  _toggle: boolean = true;

  subscription: any;
  _timer = 0;
  running = false;

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public serieProvider: SerieProvider,
    public iab: InAppBrowser,
    public modalCtrl: ModalController,
    public util: Util,
    public layout: Layout) {
      this.data = this.navParams.get('item');
    }

  ionViewDidLoad() {
    const data = this.util.getStorage('dataSerie');
    this.select(data);
    this.setBackButtonAction();
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      if (this._timer > 0) {
        const buttons = [{
          text: 'Confirmar',
          handler: () => {
            this.navCtrl.pop();
          },
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }];
        this.util.showConfirmationAlert('Abandonar treino?', '', '', buttons, true);
      } else {
        this.navCtrl.pop();
      }
    }
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
          if (data['_body']) {
            this.getData();
            this.util.showAlert('Atenção', 'Carga Alterada', 'Ok', true);
          } else {
            this.util.showAlert('Atenção', 'Não foi possível alterar a carga', 'Ok', true);
          }
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  start() {
    this.running = true;
    this.subscription = Observable.interval(1000).subscribe(data => {
      this._timer++;
    });
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

  getData() {
    this.serieProvider.index(this.util.getStorage('id_aluno')).subscribe(
      data => {
        this.util.setStorage('dataSerie', data);
        this.select(data);
      });
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.getData();
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete(); }, 2000);
  }

<<<<<<< HEAD
  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }
  
  create() {}


  add(){
    const modal = this.modalCtrl.create(TreinoAddPage, {});
    modal.present();
  }

=======
>>>>>>> f7c55e0671d50aea677c6f4636ea9e83617b47d3
}
