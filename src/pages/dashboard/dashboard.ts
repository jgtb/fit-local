import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { LoginPage } from '../../pages/login/login'

import { SeriePage } from '../../pages/serie/serie'
import { TreinoPage } from '../../pages/treino/treino'
import { AvaliacaoPage } from '../../pages/avaliacao/avaliacao'
import { GraficoPage } from '../../pages/grafico/grafico'
import { ReservaPage } from '../../pages/reserva/reserva'
import { InformacaoPage } from '../../pages/informacao/informacao'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  menu: Array<{title: string, component: any, icon: string, class: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public util: Util, public layout: Layout) {
    this.initMenu()
  }

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  initMenu() {
    this.menu = [
      { title: 'Séries', component: SeriePage, icon: 'ios-man-outline', class: '' },
      { title: 'Treinos', component: TreinoPage, icon: 'ios-calendar-outline', class: '' },
      { title: 'Avaliações', component: AvaliacaoPage, icon: 'ios-document-outline', class: '' },
      { title: 'Gráficos', component: GraficoPage, icon: 'ios-stats-outline', class: '' },
      { title: 'Reservas', component: ReservaPage, icon: 'ios-create-outline', class: '' },
      { title: 'Informações', component: InformacaoPage, icon: 'ios-information-circle-outline', class: this.util.getStorage('showReserva') === 'false' ? 'm-l-25p' : '' }
    ]

    if (this.util.getStorage('showReserva') === 'false')
      this.menu.splice(4, 1)
  }

  openPage(component) {
    this.navCtrl.push(component)
  }

  logout() {
    this.util.setLogout()
    this.navCtrl.push(LoginPage)
  }

}
