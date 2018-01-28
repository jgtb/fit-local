import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';

import { CalendarioPage } from '../../pages/calendario/calendario';

import { SerieProvider } from '../../providers/serie/serie';
import { CalendarioProvider } from '../../providers/calendario/calendario';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-treino-form',
  templateUrl: 'treino-form.html',
})
export class TreinoFormPage {

  form: FormGroup;

  items: any = [
    {img: 0},
    {img: 1},
    {img: 2},
    {img: 3},
    {img: 4},
    {img: 5}
  ];

  data: any = [];


  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public serieProvider: SerieProvider,
    public calendarioProvider: CalendarioProvider,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataSerie');
      this.initForm();
  }

  ionViewDidLoad() {
    this.select();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      borg: [''],
      comentario: [''],
      data_inicio: [''],
      time: ['']
    });
  }

  select() {
    this.data = this.data.filter((elem, index, arr) => arr.map(obj => obj['id']).indexOf(elem['id']) === index);
  }

  doCreate(form) {
    if (this.util.checkNetwork()) {
      if(this.validate(form)){
        const data = JSON.stringify({ id_serie: form.id, mensagem: form.comentario, borg: form.borg.toString(), datahora: this.getDateTime(), tempo: form.time+':00'})
        this.calendarioProvider.create(data).subscribe(
          data => {
            if (data['_body']) 
              this.util.showAlert('Atenção', 'Treino registrado.', 'Ok', true);
            else
              this.util.showAlert('Atenção', 'Erro ao salvar. Tente mais tarde.', 'Ok', true);
            this.viewCtrl.dismiss();
        })
      }
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  validate(form){
    let mensagem = '';

    if(!form.id) {
      mensagem += 'Selecione o treino. <br />';
    }

    if(!this.getDateTime()) {
      mensagem += 'Selecione a data de início.<br>';
    }

    if(!form.time) {
      form.time = '00:00:00';
    }

    if(!mensagem)
      return true;

    this.util.showAlert('Atenção', mensagem, 'Ok', true);
  }

  getDateTime() {
    let datahora = this.form.value.data_inicio;

    datahora = datahora.replace('T',' ');

    return datahora.replace('Z','');
  }

  setBorg(img) {
    this.form.controls['borg'].setValue(img);
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }

}
