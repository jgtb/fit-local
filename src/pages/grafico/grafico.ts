import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { GraficoProvider } from '../../providers/grafico/grafico';

import { Util } from '../../util';
import { Layout } from '../../layout';

import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {

  @ViewChild('chart') chartCanvas;
  data: any = [];
  dataGrafico: any = [];
  chart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public graficoProvider: GraficoProvider,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataGrafico');
    }

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.select(this.data);
    this.graphic(this.data[0]);
  }

  select(result) {
    this.data = result;
    this.dataGrafico = result
      .filter((elem, index, arr) => arr.map(obj => obj['id_sessao']).indexOf(elem['id_sessao']) === index);
  }

  selectPerguntas(item) {
    return this.data.filter((elem, index, arr) =>
      arr.map(obj => obj['id_pergunta']).indexOf(elem['id_pergunta']) === index && elem.id_sessao === item.id_sessao);
  }

  graphic(item) {
    let labels = [];
    let values = [];
    let title;

    for(let obj of this.data) {
      if(obj.id_pergunta === item.id_pergunta) {
         title = obj.pergunta;
         labels.push(obj.data);
         values.push(parseFloat(obj.resposta.replace(',', '.')));
      }
    }

  	this.chart = new Chart(this.chartCanvas.nativeElement, {
  		type: 'line',
  		data: {
  			labels: labels,
  			datasets: [{
  				label: title,
          backgroundColor: [this.layout.colors.light],
  				data: values
  			}]
  		}
  	});
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.graficoProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.util.setStorage('dataGrafico', data);
          this.select(data);
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete() }, 2000);
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
