import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { RankingProvider } from '../../providers/ranking/ranking';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  tab: string = 'atual';

  anterior: any = [];
  atual: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public util: Util, 
              public rankingProvider: RankingProvider,
              public layout: Layout) {
                this.selectAnterior(this.util.getStorage('ranking')[0]);
                this.selectAtual(this.util.getStorage('ranking')[1]);
              }

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  selectAnterior(anterior){
    this.anterior = anterior;
  }

  selectAtual(atual){
    this.atual = atual;
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.rankingProvider.index().subscribe(
        data => {
          this.util.setStorage('ranking', data);
          this.selectAnterior(this.util.getStorage('ranking')[0]);
          this.selectAtual(this.util.getStorage('ranking')[1]);
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.popToRoot();
  }

}
