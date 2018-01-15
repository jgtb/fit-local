import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { TreinoPage } from '../../pages/treino/treino';

import { SerieProvider } from '../../providers/serie/serie';
import { TreinoProvider } from '../../providers/treino/treino';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino-add',
  templateUrl: 'treino-add.html',
})
export class TreinoAddPage {

  form: FormGroup;

  items: any = [
    {img: 0},
    {img: 1},
    {img: 2},
    {img: 3},
    {img: 4},
    {img: 5}
  ];

  series: any = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public serieProvider: SerieProvider,
    public treinoProvider: TreinoProvider,
    public util: Util,
    public layout: Layout) {
      
      this.series = this.util.getStorage('dataSerie');
      this.series = this.series.filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
      console.log(this.series);
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
      const data = JSON.stringify({ mensagem: form.comentario, borg: form.borg.toString(), datahora: this.getDateTime()})
      this.treinoProvider.create(data).subscribe(
        data => {
          if (data['_body']) {
            this.navCtrl.push(TreinoPage, {hasNewTreino: true});
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

    date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 );
    
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
