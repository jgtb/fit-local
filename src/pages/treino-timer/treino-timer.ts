import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-treino-timer',
  templateUrl: 'treino-timer.html',
})
export class TreinoTimerPage {

  data: any = []
  timer: any = []
  current: number
  max: number 
  stroke: number = 15
  radius: number = 100
  semicircle: boolean = false
  rounded: boolean = false
  responsive: boolean = false
  clockwise: boolean = true
  color: string = this.layout.colors.light
  background: string = this.layout.colors.dark
  duration: number = 800
  animation: string = 'easeOutCubic'
  animationDelay: number = 0
  animations: string[] = []
  gradient: boolean = false
  realCurrent: number = 0

  subscription
  running = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public layout: Layout) {
    this.data = this.navParams.get('item')
  }

  ionViewDidEnter() {}

  ionViewDidLoad() {
    this.timer.display = this.data.intervalo;
    this.max = this.data.intervalo;
    this.start();
  }

  start() {
    this.timer.start = Math.floor((new Date()).getTime()/1000);
    this.timer.running = true;
    this.time();
  }

  time() {
    setTimeout(() => {
      if (!this.timer.running) { return; }
      this.timer.now = Math.floor((new Date()).getTime()/1000);
      this.timer.time = (this.timer.now-this.timer.start);
      this.timer.display = this.data.intervalo-this.timer.time;
      if(this.timer.display!=0)
        this.time();
    }, 1000);
  }

  stop() {
    this.timer.running = false;
  }

  restart(){
    this.timer.display = this.data.intervalo;
    this.stop();
  }

  getOverlayStyle() {
    let isSemi = this.semicircle
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)'

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
