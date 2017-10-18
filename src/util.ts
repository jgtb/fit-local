import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Network } from  "@ionic-native/network";

@Injectable()
export class Util {

  baseUrl = 'http://fit.nexur.com.br';
  //baseUrl = 'http://localhost/personal/web';

  _showReserva = false;

  loading;

  constructor(public network: Network, public sqlite: SQLite, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {}

  setLogged() {
    localStorage.setItem('isLogged', 'true');
  }

  setLogout() {
    localStorage.setItem('isLogged', 'false');
    this.cleanDatabase();
  }

  isLogged() {
    if (localStorage.getItem('isLogged') === 'true')
      return true;

    return false;
  }

  showActionSheet(title, buttons) {
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: buttons
    });

    actionSheet.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  endLoading() {
    this.loading.dismiss();
  }

  showAlert(title, subTitle, button) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [button]
    });

    alert.present();
  }

  showConfirmationAlert(title, inputs, buttons) {
    const alert = this.alertCtrl.create({
      title: title,
      inputs: inputs,
      buttons: buttons,
    });

    alert.present();
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

        db.executeSql('DELETE FROM informacao', {})
        .then(() => console.log('Truncated Informacao'));

        db.executeSql('DELETE FROM mensagem', {})
        .then(() => console.log('Truncated Mensagem'));

    });
  }

  toArray(data) {
    let arr = [];

    for (var i = 0; i < data.rows.length; i++)
      arr.push(data.rows.item(i));

    return arr;
  }

}
