import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AvaliacaoViewPage } from '../../pages/avaliacao-view/avaliacao-view';

import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  data: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public avaliacaoProvider: AvaliacaoProvider,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataAvaliacao');
    }

  ionViewDidLoad() {
    this.select(this.data);
  }

  select(result) {
    this.data = result.filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
  }

  create() {
    
  }

  view(item) {
    this.navCtrl.push(AvaliacaoViewPage, { item: item });
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.util.setStorage('dataAvaliacao', data);
          this.select(data);
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete() }, 2000);
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
