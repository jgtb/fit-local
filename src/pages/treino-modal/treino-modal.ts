import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { TreinoPage } from '../../pages/treino/treino';

import { TreinoProvider } from '../../providers/treino/treino';

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
    public treinoProvider: TreinoProvider,
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
      const data = JSON.stringify({id_serie: this.id_serie, mensagem: form.comentario, borg: form.borg, tempo: this.time, datahora: this.getDateTime()})
      console.log(data);
      this.treinoProvider.create(data).subscribe(
        data => {
          const buttons = [
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.push(TreinoPage);
              }
            }
          ];
          this.util.showConfirmationAlert('Atenção', 'Treino Registrado', '', buttons, true);
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  getDateTime() {
    const date = new Date();

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
