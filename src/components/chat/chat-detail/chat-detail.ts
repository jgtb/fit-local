import { Component } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'

import { Util } from '../../../util'

import { Layout } from '../../../layout'

@Component({
  selector: 'chat-detail',
  templateUrl: 'chat-detail.html'
})
export class ChatDetailComponent {

  module: any = '/messages'

  from: any = ''
  to: any = ''
  between: any = ''
  text: any = ''

  messages: any = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireDatabase: AngularFireDatabase,
    public util: Util,
    public layout: Layout) {}

  async ionViewDidLoad() {
    this.getAllMessages()
    this.to = this.util.getStorage('id_professor')
    this.from = this.util.getStorage('id_usuario')
    this.between = `${this.to}-${this.from}`
  }

  getAllMessages() {
    const between = `${this.util.getStorage('id_professor')}-${this.util.getStorage('id_usuario')}`
    this.angularFireDatabase
      .list(this.module, ref => ref.orderByChild('between').equalTo(between))
      .snapshotChanges()
      .subscribe((list: any) => {
        this.messages = list.map((data: any) => ({
          from: data.payload.val().from,
          to: data.payload.val().to,
          text: data.payload.val().text,
          sendAt: `2018`
        }))
      })
  }

  sendMessage () {
    const payload = {
      from: this.from,
      to: this.to,
      between: this.between,
      text: this.text,
      sendAt: new Date().toString()
    }

    this.angularFireDatabase.list(this.module).push(payload)
    this.text = ''
  }

  isOwner (message) {
    return this.from === message.from
  }

}
