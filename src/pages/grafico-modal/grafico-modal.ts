import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Chart } from 'chart.js';

import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-grafico-modal',
  templateUrl: 'grafico-modal.html',
})
export class GraficoModalPage {

  @ViewChild('chart') chartCanvas;

  data: any = [];

  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public layout: Layout) {
  	this.data = this.navParams.get('item');
  }

  ionViewDidEnter() {}

  ionViewDidLoad() {
  	this.createChart();
  }

  createChart() {
  	this.chart = new Chart(this.chartCanvas.nativeElement, {
  		type: 'line',
  		data: {
  			labels: ['Red', 'Blue'],
  			datasets: [{
  				label: '',
  				data: [20, 40]
  			}]
  		}
  	});
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

}
