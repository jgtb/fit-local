import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
