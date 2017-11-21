import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular'

import { DashboardPage } from '../../pages/dashboard/dashboard'
import { GraficoModalPage } from '../../pages/grafico-modal/grafico-modal'

import { GraficoProvider } from '../../providers/grafico/grafico'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {

  data: any = []
  dataGrafico: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public graficoProvider: GraficoProvider, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.select()
  }

  select() {
    this.data = this.util.getStorage('dataGrafico')
    this.dataGrafico = this.util.getStorage('dataGrafico')
      .filter((elem, index, arr) => arr.map(obj => obj['id_sessao']).indexOf(elem['id_sessao']) === index)
  }

  selectPerguntas(item) {
    return this.data.filter((elem, index, arr) => 
      arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index && elem.id_sessao === item.id_sessao)
  }

  modal(item) {
    const modal = this.modalCtrl.create(GraficoModalPage, {item : item})
    modal.present()
  }

   doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.graficoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.select()
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage)
  }

}
