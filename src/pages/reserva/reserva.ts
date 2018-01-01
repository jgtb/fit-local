import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { ReservaProvider } from '../../providers/reserva/reserva';

import { Util } from '../../util';
import { Layout } from '../../layout';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
})
export class ReservaPage {

  data: any = [];

  eventSource: any;
  title: any;

  calendar: any = {
    mode: 'month',
    locale: 'pt-BR',
    noEventsLabel: 'Nenhuma Reserva',
    currentDate: new Date(),
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reservaProvider: ReservaProvider,
    public util: Util,
    public layout: Layout) {
      this.data = this.util.getStorage('dataReserva');
    }

  ionViewDidLoad() {
    this.select(this.data);
  }

  select(result) {
    this.data = result;
    this.eventSource = this.loadReservas();
  }

  loadReservas() {
    return this.data.map(obj => {

      let id = obj.id;
      let title = obj.title;
      let time = obj.tempo;
      let start = obj.start;
      let end = obj.end;

      let startTime = new Date(start.replace(/-/g,'/'));
      let endTime = new Date(end.replace(/-/g,'/'));

      return {
        id: id,
        title: title,
        startTime: startTime,
        endTime: endTime,
        time: time,
        allDay: false
      }
    });
  }

  onEventSelected(item) {
    if (this.util.checkNetwork()) {
      this.reservaProvider.checkIsReservado(item).subscribe(
        data => {
          if (data > 0) {
            this.delete(item);
          } else {
            if (this.canReserva(item)) {
              this.reservaProvider.checkIsLotado(item).subscribe(
                data => {
                  if (item.vagas !== data.length) {
                    this.create(item);
                  } else {
                    this.util.showAlert('Atenção', 'Aula lotada', 'Ok', true);
                  }
                })
            } else {
              this.util.showAlert('Atenção', 'Horário inválido para reserva', 'Ok', true);
            }
          }
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
  }

  canReserva(item) {
    const startTime = item.startTime.setMinutes(item.startTime.getMinutes() - item.time);

    if (new Date() <= startTime && new Date() <= item.endTime)
      return true;

    return false;
  }

  create(item) {
    const title = item.title;
    const message = this.getMessage(item);
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          this.reservaProvider.create(item).subscribe(
            data => {
              this.doCreate(item);
            }
          )
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      }
    ]
    this.util.showConfirmationAlert(title, message, [], buttons, true);
  }

  doCreate(item) {
    this.reservaProvider.create(item).subscribe(
      data => {
        this.util.showAlert('Atenção', 'Aula reservada', 'Ok', true);
      });
  }

  delete(item) {
    const title = item.title;
    const message = 'Deseja cancelar a reserva ?';
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          this.doDelete(item);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
    ]
    this.util.showConfirmationAlert(title, message, [], buttons, true);
  }

  doDelete(item) {
    this.reservaProvider.delete(item).subscribe(
      data => {
        this.util.showAlert('Atenção', 'Aula cancelada', 'Ok', true);
      });
  }

  getMessage(item) {
    const startTime = item.startTime.toTimeString().split(' ')[0];
    const endTime = item.endTime.toTimeString().split(' ')[0];

    const message = 'Deseja reservar esta aula ?' + '<br />' + startTime + ' - ' + endTime;

    return message;
  }

  onViewTitleChanged(title) {
    this.title = title;
  }

  doRefresh(event) {
    if (this.util.checkNetwork()) {
      this.reservaProvider.index(this.util.getStorage('id_professor')).subscribe(
        data => {
          this.util.setStorage('dataReserva', data);
          this.select(data);
        });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', true);
    }
    setTimeout(() => { event.complete(); }, 2000);
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

}
