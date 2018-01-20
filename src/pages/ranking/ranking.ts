import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  tab: string = 'atual';

  constructor(public navCtrl: NavController, public navParams: NavParams, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  goToDashboard() {
    this.navCtrl.popToRoot();
  }

}
