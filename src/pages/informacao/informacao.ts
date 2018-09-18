import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { AuthProvider } from '../../providers/auth/auth';
import { InformacaoProvider } from '../../providers/informacao/informacao';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-informacao',
  templateUrl: 'informacao.html',
})
export class InformacaoPage {

  title: string = '';

  tab: string = 'mensagem';

  dataInformacao: any = [];
  dataMensagem: any = [];

  filetime: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public informacaoProvider: InformacaoProvider,
    public util: Util,
    public layout: Layout) {
      this.selectInformacao(this.util.getStorage('dataInformacao'));
      this.selectMensagem(this.util.getStorage('dataMensagem'));
    }

  ionViewWillEnter(){
    this.refreshData();
  }

  selectInformacao(result) {
    this.dataInformacao = result;
  }

  selectMensagem(result) {
    this.dataMensagem = result;
  }

  showImg(item) {
    if (item.largura != 0 && item.altura != 0)
       return true;

     return false;
  }

  logo(){
    return this.util.baseUrl+'/logos/'+ this.util.getStorage('id_professor')+'.png?'+this.filetime;
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.refreshData();
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

  refreshData(){
    this.authProvider.filetime(this.util.getStorage('id_professor') ).subscribe(
      data=>{
        if(data['_body']!=this.filetime)
          this.filetime = data['_body'];
      }
    );
    this.informacaoProvider.indexInformacao(this.util.getStorage('id_professor')).subscribe(
      data => {
        this.util.setStorage('dataInformacao', data);
        this.selectInformacao(data);
      })
    this.informacaoProvider.indexMensagem(this.util.getStorage('id_aluno')).subscribe(
      data => {
        this.util.setStorage('dataInformacao', data);
        this.selectMensagem(data);
      })
  }

  goToDashboard() {
    this.navCtrl.popToRoot();
  }

}
