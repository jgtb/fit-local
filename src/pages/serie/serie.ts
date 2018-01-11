import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TreinoFormPage } from '../../pages/treino-form/treino-form';

import { SerieProvider } from '../../providers/serie/serie';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class SeriePage {

  data: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serieProvider: SerieProvider,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataSerie');
    }

  ionViewDidLoad() {
    this.select(this.data);
  }

  select(result) {
    this.data = result.filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
  }

  create(item) {
    this.navCtrl.push(TreinoFormPage, {item: item});
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.serieProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.util.setStorage('dataSerie', data);
          this.select(data);
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete(); }, 2000);
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
