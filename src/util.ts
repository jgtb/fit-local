import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';

import { Network } from  "@ionic-native/network";

import { Layout } from './layout';

@Injectable()
export class Util {

  //baseUrl = 'http://fit.nexur.com.br';
  //baseUrl = 'http://localhost/personal/web';
  baseUrl = 'http://homolog.nexur.com.br/web';

  logo: any;

  loading: any;

  constructor(
    public network: Network,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public layout: Layout) {}

  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  isLogged() {
    if (this.getStorage('isLogged') === 'true')
      return true;

    return false;
  }

  logout(){
    this.setStorage('isLogged', 'false');
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
    return this.network.type !== "none" ? true : false;
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

  serialize (mixedValue) {
    
    var val, key, okey
    var ktype = ''
    var vals = ''
    var count = 0
  
    var _utf8Size = function (str) {
      var size = 0
      var i = 0
      var l = str.length
      var code = ''
      for (i = 0; i < l; i++) {
        code = str.charCodeAt(i)
        if (code < '0x0080') {
          size += 1
        } else if (code < '0x0800') {
          size += 2
        } else {
          size += 3
        }
      }
      return size
    }
  
    var _getType = function (inp) {
      var match
      var key
      var cons
      var types
      var type = typeof inp
  
      if (type === 'object' && !inp) {
        return 'null'
      }
  
      if (type === 'object') {
        if (!inp.constructor) {
          return 'object'
        }
        cons = inp.constructor.toString()
        match = cons.match(/(\w+)\(/)
        if (match) {
          cons = match[1].toLowerCase()
        }
        types = ['boolean', 'number', 'string', 'array']
        for (key in types) {
          if (cons === types[key]) {
            type = types[key]
            break
          }
        }
      }
      return type
    }
  
    var type = _getType(mixedValue)
  
    switch (type) {
      case 'function':
        val = ''
        break
      case 'boolean':
        val = 'b:' + (mixedValue ? '1' : '0')
        break
      case 'number':
        val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue
        break
      case 'string':
        val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"'
        break
      case 'array':
      case 'object':
        val = 'a'
  
        for (key in mixedValue) {
          if (mixedValue.hasOwnProperty(key)) {
            ktype = _getType(mixedValue[key])
            if (ktype === 'function') {
              continue
            }
  
            okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
            vals += this.serialize(okey) + this.serialize(mixedValue[key])
            count++
          }
        }
        val += ':' + count + ':{' + vals + '}'
        break
      case 'undefined':
      default:
        val = 'N'
        break
    }
    if (type !== 'object' && type !== 'array') {
      val += ';'
    }
  
    return val
  }

}
