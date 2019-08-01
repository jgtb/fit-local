import { Component } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular'

import { AngularFireDatabase } from 'angularfire2/database'

import { Util } from '../../../util'

import { Layout } from '../../../layout'

import { uniqBy, sortBy } from 'lodash'
import moment from 'moment'

@Component({
  selector: 'chat-detail',
  templateUrl: 'chat-detail.html'
})
export class ChatDetailComponent {

  module: any = '/messages'

  from: any = ''
  to: any = ''
  between: any = ''
  betweenAll: any = ''
  text: any = ''

  messages: any = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireDatabase: AngularFireDatabase,
    public util: Util,
    public layout: Layout) {}

  async ionViewDidLoad() {
    this.to = this.util.getStorage('id_professor')
    this.from = this.util.getStorage('id_usuario')
    this.between = `${this.to}-${this.from}`
    this.betweenAll = `${this.to}-0`
    this.getAllMessages(this.between)
    this.getAllMessages(this.betweenAll)
  }

  getAllMessages(between) {
    this.angularFireDatabase
      .list(this.module, ref => ref.orderByChild('between').equalTo(between))
      .snapshotChanges()
      .subscribe((list: any) => {
        const messages = list.map((data: any) => ({
          id: data.key,
          from: data.payload.val().from,
          to: data.payload.val().to,
          text: data.payload.val().text,
          sendAt: `${moment(data.payload.val().sendAt).format('DD/MM/YYYY')} ás ${moment(data.payload.val().sendAt).format('h:mm')}`,
          system: data.payload.val().system,
          sortBy: moment(data.payload.val().sendAt).toDate()
        }))
        this.joinMessages(messages)
      })
  }

  joinMessages(messages) {
    this.messages = sortBy(uniqBy([ ...this.messages, ...messages ], 'id'), 'sortBy')
  }

  sendMessage () {
    if (!this.text) {
      return
    }
    
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

  isOwner ({ from = '' }) {
    return this.from.toString() === from.toString()
  }

  isSystem ({ system = '' }) {
    return system.toString() === '1'
  }
}
