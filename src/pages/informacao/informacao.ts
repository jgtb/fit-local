import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { DashboardPage } from '../../pages/dashboard/dashboard'

import { InformacaoProvider } from '../../providers/informacao/informacao'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html',
})
export class InformacaoPage {

  title: string = ''

  tab: string = 'informacao'

  dataInformacao: any = []
  dataMensagem: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public informacaoProvider: InformacaoProvider, public util: Util, public layout: Layout) {}

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.selectInformacao()
    this.selectMensagem()
  }

  selectInformacao() {
    this.dataInformacao = this.util.getStorage('dataInformacao')
  }

  selectMensagem() {
    this.dataMensagem = this.util.getStorage('dataMensagem')
  }

  showImg(item) {
    if (item.largura != "" && item.altura != "")
       return true

     return false
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.informacaoProvider.indexInformacao(this.util.getStorage('id_professor')).subscribe(
        data => {
          this.selectInformacao()
        })
      this.informacaoProvider.indexMensagem(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.selectMensagem()
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
