import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';

import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino-timer',
  templateUrl: 'treino-timer.html',
})
export class TreinoTimerPage {

  data: any = [];

  current: number;
  max: number;
  stroke: number = 7;
  radius: number = 70;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = this.layout.colors.light;
  background: string = this.layout.colors.secondary;
  duration: number = 3000;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;

  subscription;
  running = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public layout: Layout) {
    this.data = this.navParams.get('item');
  }

  ionViewDidEnter() {
    this.current = this.data.intervalo;
    this.max = this.data.intervalo;
  }

  ionViewDidLoad() {}

  start() {
    this.running = true;
    this.subscription = Observable.interval(1000).subscribe(data => {
      if (this.current != 0) {
        this.current--;
      } else {
        this.stop();
        this.current = this.data.intervalo;
      }
    });
  }

  stop() {
    this.running = false;
    this.subscription.unsubscribe();
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 2.5 + 'px'
    };
	}

}
