import { Component } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular'

import { ChatDetailComponent } from '../chat-detail/chat-detail'

import { Layout } from '../../../layout';

@Component({
  selector: 'chat-button',
  templateUrl: 'chat-button.html',
})
export class ChatButtonComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public layout: Layout) {}

  open() {
    this.navCtrl.push(ChatDetailComponent, {}, { animate: false })
  }

}
