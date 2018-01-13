import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';

import { LoginPage } from '../../pages/login/login';

import { SeriePage } from '../../pages/serie/serie';
import { TreinoPage } from '../../pages/treino/treino';
import { AvaliacaoPage } from '../../pages/avaliacao/avaliacao';
import { GraficoPage } from '../../pages/grafico/grafico';
import { ReservaPage } from '../../pages/reserva/reserva';
import { RankingPage } from '../../pages/ranking/ranking';
import { InformacaoPage } from '../../pages/informacao/informacao';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  userImg: string;

  menu: Array<{title: string, component: any, icon: string, class: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public facebook: Facebook,
    public util: Util,
    public layout: Layout) {
    this.initMenu();
  }

  ionViewDidEnter() {
    this.userImg = this.util.getStorage('facebookId');
  }

  ionViewDidLoad() {}

  initMenu() {
    this.menu = [
      { title: 'Treinos', component: SeriePage, icon: 'ios-man', class: '' },
      { title: 'Avaliações', component: AvaliacaoPage, icon: 'ios-document', class: '' },
      { title: 'Gráficos', component: GraficoPage, icon: 'md-trending-up', class: '' },
      { title: 'Calendário', component: TreinoPage, icon: 'ios-calendar', class: '' },
      { title: 'Reservas', component: ReservaPage, icon: 'ios-create', class: '' },
      { title: 'Ranking', component: RankingPage, icon: 'md-podium', class: '' },
      { title: 'Informações', component: InformacaoPage, icon: 'ios-information-circle', class: this.util.getStorage('showReserva') !== 'false' ? 'm-l-25p' : '' }
    ];

    if (this.util.getStorage('showReserva') === 'false')
      this.menu.splice(4, 1);
  }

  openPage(component) {
    this.navCtrl.push(component);
  }

  goToFacebook () {
    this.facebook.login(['public_profile', 'email']).then((res) => {
      this.facebook.api('/me?fields=name,email', []).then(res => {
        this.util.setStorage('facebookId', res.id);
        this.userImg = res.id;
      })
    });
  }

  logout() {
    this.util.setLogout();
    this.navCtrl.push(LoginPage);
  }

}
