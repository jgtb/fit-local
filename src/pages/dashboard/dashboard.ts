import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  menu: Array<{title: string, component: any, icon: string, class: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public layout: Layout) {
    this.initMenu();
  }

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  initMenu() {
    this.menu = [
      { title: 'Treinos', component: SeriePage, icon: 'ios-man-outline', class: '' },
      { title: 'Avaliações', component: AvaliacaoPage, icon: 'ios-document-outline', class: '' },
<<<<<<< HEAD
      { title: 'Gráficos', component: GraficoPage, icon: 'md-trending-up', class: '' },
      { title: 'Ranking', component: ReservaPage, icon: 'md-podium', class: '' },
      { title: 'Informações', component: InformacaoPage, icon: 'ios-information-circle-outline', class: '' },
      { title: 'Reservas', component: ReservaPage, icon: 'ios-create-outline', class: '' }
    ]
=======
      { title: 'Calendário', component: TreinoPage, icon: 'ios-calendar-outline', class: '' },
      { title: 'Reservas', component: ReservaPage, icon: 'ios-create-outline', class: '' },
      { title: 'Gráficos', component: GraficoPage, icon: 'ios-stats-outline', class: '' },
      { title: 'Ranking', component: RankingPage, icon: 'ios-flag-outline', class: '' },
      { title: 'Informações', component: InformacaoPage, icon: 'ios-information-circle-outline', class: this.util.getStorage('showReserva') !== 'false' ? 'm-l-25p' : '' }
    ];
>>>>>>> 4ba2c8624a0b869986dd6d4fb42ad652ff866b79

    
    
    if (this.util.getStorage('showReserva') === 'false')
      this.menu.splice(4, 1);
  }

  openPage(component) {
    this.navCtrl.push(component);
  }

  logout() {
    this.util.setLogout();
    this.navCtrl.push(LoginPage);
  }

}
