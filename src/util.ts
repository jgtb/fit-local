import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Network } from  "@ionic-native/network";

import { Layout } from './layout';

@Injectable()
export class Util {

  baseUrl = 'http://fit.nexur.com.br';
  //baseUrl = 'http://localhost/personal/web';

  logo;

  loading;

  constructor(public network: Network, public sqlite: SQLite, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public layout: Layout) {}

  setStorage(key, value) {
    localStorage.setItem(key, value)
  }

  getStorage(key) {
    return localStorage.getItem(key)
  }
  
  setLogout() {
    this.setStorage('isLogged', 'false')
    this.cleanDatabase();
  }

  isLogged() {
    if (this.getStorage('isLogged') === 'true')
      return true;

    return false;
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  endLoading() {
    this.loading.dismiss();
  }

  showAlert(title, subTitle, buttons, colorsType) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttons]
    });

    alert.present().then(data => this.layout.setAlertColor(colorsType));
  }

  showConfirmationAlert(title, message, inputs, buttons, colorsType) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      inputs: inputs,
      buttons: buttons,
    });

    alert.present().then(data => this.layout.setAlertColor(colorsType));
  }

  checkNetwork() {
    return this.network.type != "none" ? true : false;
  }

  startDatabse() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  cleanDatabase() {
    this.startDatabse().then(
      (db: SQLiteObject) => {

        db.executeSql('DELETE FROM usuario', {})
        .then(() => console.log('Truncated Usuario'));

        db.executeSql('DELETE FROM serie', {})
        .then(() => console.log('Truncated Serie'));

        db.executeSql('DELETE FROM avaliacao', {})
        .then(() => console.log('Truncated Avaliacao'));

        db.executeSql('DELETE FROM grafico', {})
        .then(() => console.log('Truncated Grafico'));

        db.executeSql('DELETE FROM treino', {})
        .then(() => console.log('Truncated Treino'));

        db.executeSql('DELETE FROM reserva', {})
        .then(() => console.log('Truncated Reserva'));

        db.executeSql('DELETE FROM informacao', {})
        .then(() => console.log('Truncated Informacao'));

        db.executeSql('DELETE FROM mensagem', {})
        .then(() => console.log('Truncated Mensagem'));

    });
  }

  toArray(data) {
    let arr = [];

    for (let i = 0; i < data.rows.length; i++)
      arr.push(data.rows.item(i));

    return arr;
  }

  unserialize(data) {
    const unserialize = data.split(';')
      .filter((elem, i) => !(i%2 === 0))
      .map(elem => elem.split(':').reverse()[0].replace(/"/g, ""));

    return unserialize;
  }

}
