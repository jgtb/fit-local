import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { InAppBrowser } from '@ionic-native/in-app-browser'

import { TreinoTimerPage } from '../../pages/treino-timer/treino-timer'
import { TreinoPage } from '../../pages/treino/treino'

import { TreinoProvider } from '../../providers/treino/treino'
import { SerieProvider } from '../../providers/serie/serie'

import { Observable } from 'rxjs/Rx'

import { Util } from '../../util'
import { Layout } from '../../layout'

@IonicPage()
@Component({
  selector: 'page-treino-form',
  templateUrl: 'treino-form.html',
})
export class TreinoFormPage {

  data: any = []
  dataExercicios: any = []

  _done: any = []
  _toggle: boolean = true

  subscription: any
  _timer = 0
  running = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public treinoProvider: TreinoProvider, public serieProvider: SerieProvider, public iab: InAppBrowser, public util: Util, public layout: Layout) {}

  ionViewCanLeave() {
    if (this._timer > 0) {
      return new Promise((resolve, reject) => {
        const buttons = [{
          text: 'Confirmar',
          handler: () => {
            resolve();
          },
        }, {
          text: 'Cancelar',
          handler: () => {
            reject();
          }
        }]  
        this.util.showConfirmationAlert('Abandonar treino?', '', '', buttons, true)
      })    
    }
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('item')
    this.select()
  }
 
  select() {
    this.dataExercicios = this.util.getStorage('dataSerie').filter((elem, index, arr) => { return elem.id === this.data.id })
  }

  create() {
    const title = 'Finalizar Treino ?'
    const message = 'Tempo: ' + this.time()
    const inputs = this.getInputs()
    const buttons = [
      {
        text: 'Confirmar',
        handler: dataResultado => {
          const _title = 'Algum Comentário ?';
          const _message = message + '<br>' + this.getResultado(dataResultado)
          const _inputs = [
            {
              name: 'comentario',
              placeholder: 'Comentário'
            }
          ];
          const _buttons = [
            {
              text: 'Confirmar',
              handler: dataComentario => {
                this.doCreate(dataResultado, dataComentario)
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel',
            }
          ];
          this.util.showConfirmationAlert(_title, _message, _inputs, _buttons, true)
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, message, inputs, buttons, true)
  }

  doCreate(dataResultado, dataComentario) {
    if (this.util.checkNetwork()) {
      const data = JSON.stringify({id_serie: this.data.id_serie, mensagem: dataComentario.comentario, borg: dataResultado, tempo: this.time(), datahora: this.getDateTime()})

      this.treinoProvider.create(data).subscribe(
        data => {
          console.log(data)
          this.util.showAlert('Atenção', 'Treino Registrado', 'Ok', true)
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    this.navCtrl.push(TreinoPage)
  }

  update(item) {
    const title = item.descricao_ex
    const message = 'Alterar Carga'
    const inputs = [
      {
        name: 'carga',
        value: item.carga,
        placeholder: 'Carga'
      }
    ]
    const buttons = [
      {
        text: 'Confirmar',
        handler: dataCarga => {
          this.doUpdate(item, dataCarga)
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ]
    this.util.showConfirmationAlert(title, message, inputs, buttons, true)
  }

  doUpdate(item, dataCarga) {
    if (this.util.checkNetwork()) {
      const data = JSON.stringify({id: item.id_exercicio_serie, carga: dataCarga.carga })

      this.serieProvider.updateCarga(data).subscribe(
        data => {
          this.util.showAlert('Atenção', 'Carga Alterada', 'Ok', true)
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
  }

  start() {
    this.running = true
    this.subscription = Observable.interval(1000).subscribe(data => {
      this._timer++
      this.time()
    })
  }

  stop() {
    if (this._timer > 0) {
      this.running = false
      this.subscription.unsubscribe()
    }
  }

  getDateTime() {
    const date = new Date();

    const datetime = date.toJSON().slice(0, 10) + ' ' + date.toJSON().slice(11, 19)

    return datetime
  }

  time() {
    const date = new Date(null)

    date.setSeconds(this._timer)

    const result = date.toISOString().substr(11, 8)

    return result
  }

  timer(item) {
    this.navCtrl.push(TreinoTimerPage, { item: item })
  }

  done(index) {
    const pos = this._done.indexOf(index)

    if (pos > -1) {
      this._done.splice(pos, 1)
      return
    }

    this._done.push(index)
  }

  isDone(index) {
    const pos = this._done.indexOf(index)

    if (pos > -1)
      return true

    return false
  }

  video(item) {
    this.iab.create(item.video).show()
  }

  toggle() {
    this._toggle = !this._toggle
  }

  getInputs() {
    const inputs = [
      {
        name: 'resultado',
        type: 'radio',
        label: 'Muito Bom',
        value: "0",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Bom',
        value: "1",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Mediano',
        value: "2",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Regular',
        value: "3",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Ruim',
        value: "4",
      },
      {
        name: 'resultado',
        type: 'radio',
        label: 'Muito Ruim',
        value: "5",
      }
    ];

    return inputs
  }

  getResultado(index) {
    const result = ['Muito Bom', 'Bom', 'Mediano', 'Regular', 'Ruim', 'Muito Ruim']

    return result[index]
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.serieProvider.index(this.util.getStorage('id_aluno')).subscribe(
        data => {
          this.dataExercicios = this.util.getStorage('dataSerie').filter((elem, index, arr) => { return elem.id === this.data.id })
        })
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true)
    }
    setTimeout(() => { event.complete() }, 2000)
  }

}
