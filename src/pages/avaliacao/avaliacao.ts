import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { AvaliacaoViewPage } from '../../pages/avaliacao-view/avaliacao-view';
import { AvaliacaoFormPage } from '../../pages/avaliacao-form/avaliacao-form';

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
      this.select(this.data);
    }

  ionViewWillEnter() {
    this.refresh();
  }

  select(result) {
    this.data = result.filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
  }

  create() {
    this.navCtrl.push(AvaliacaoFormPage);
  }

  view(item) {
    this.navCtrl.push(AvaliacaoViewPage, { item: item });
  }

  delete(av) {
    const title = 'Deseja Apagar?';
    const message = '';
    const buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Confirmar',
        handler: data => {
          this.doDelete(av.id);
        }
      }
    ];
    this.util.showConfirmationAlert(title, message, null, buttons, true);
  }

  doDelete(id) {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.delete({id_avaliacao_aluno:id, id_usuario:this.util.getStorage('id_usuario')}).subscribe(
      data => {
        if (data['_body']==1) {
          this.util.showAlert('Atenção', 'Avaliação apagada.', 'Ok', true);
          this.refresh();
        } else {
          this.util.showAlert('Atenção', 'Erro ao apagar. Tente mais tarde.', 'Ok', true);
        }
    });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  doRefresh(event) {
    this.refresh();
    setTimeout(() => { event.complete(); }, 2000);
  }

  goToDashboard() {
    this.navCtrl.popToRoot();
  }

  refresh() {
    if (this.util.checkNetwork()) {
      this.avaliacaoProvider.index(this.util.getStorage('id_aluno')).subscribe(
      data => {
        this.util.setStorage('dataAvaliacao', data);
        this.select(data);
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }


}
