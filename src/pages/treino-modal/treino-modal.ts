import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { CalendarioPage } from '../../pages/calendario/calendario';

import { CalendarioProvider } from '../../providers/calendario/calendario';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino-modal',
  templateUrl: 'treino-modal.html',
})
export class TreinoModalPage {

  form: FormGroup;

  id_serie: any;
  time: any;

  items: any = [
    {img: 0},
    {img: 1},
    {img: 2},
    {img: 3},
    {img: 4},
    {img: 5}
  ];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public calendarioProvider: CalendarioProvider,
    public util: Util,
    public layout: Layout) {
    this.id_serie = this.navParams.get('id_serie');
    this.time = this.navParams.get('time');
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      borg: [''],
      comentario: ['']
    });
  }

  doCreate(form) {
    if (this.util.checkNetwork()) {
      const data = JSON.stringify({id_serie: this.id_serie, mensagem: form.comentario, borg: form.borg.toString(), tempo: this.time, datahora: this.getDateTime()})
      this.calendarioProvider.create(data).subscribe(
        data => {
          if (data['_body']) {
            this.util.showAlert('Atenção', 'Treino salvo.', 'Ok', true);
            this.navCtrl.push(CalendarioPage);
          } else {
            this.util.showAlert('Atenção', 'Erro ao salvar. Tente mais tarde.', 'Ok', true);
          }
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  getDateTime() {
    const date = new Date();

    date.setTime(date.getTime() - date.getTimezoneOffset()*60*1000);

    const datetime = date.toJSON().slice(0, 10) + ' ' + date.toJSON().slice(11, 19);

    return datetime;
  }

  setBorg(img) {
    this.form.controls['borg'].setValue(img);
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

}
