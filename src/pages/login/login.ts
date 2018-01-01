import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { SerieProvider } from '../../providers/serie/serie';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { GraficoProvider } from '../../providers/grafico/grafico';
import { TreinoProvider } from '../../providers/treino/treino';
import { ReservaProvider } from '../../providers/reserva/reserva';
import { InformacaoProvider } from '../../providers/informacao/informacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private data: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public serieProvider: SerieProvider,
    public avaliacaoProvider: AvaliacaoProvider,
    public informacaoProvider: InformacaoProvider,
    public treinoProvider: TreinoProvider,
    public reservaProvider: ReservaProvider,
    public graficoProvider: GraficoProvider,
    public oneSignal: OneSignal,
    public util: Util) {
      this.initForm();
    }

  initForm() {
    this.data = this.formBuilder.group({
      usuario: ['aluno', Validators.required],
      senha: ['aluno', Validators.required]
    });
  }

  login(data) {
    if (this.util.checkNetwork()) {
      this.util.showLoading();
      this.authProvider.login(data).subscribe(
        data => {
          if (data != 0 && data != -1) {
            this.doLogin(data);
          } else if (data === 0) {
            this.util.showAlert('Atenção', 'Usuário ou Senha estão Incorretos', 'Ok', false);
          } else if (data === -1) {
            this.util.showAlert('Atenção', 'Usuário Inativo', 'Ok', false);
          }
        })
      this.util.endLoading();
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  doLogin(data) {
    const id_aluno = data[0];
    const id_professor = data[1];
    const id_tipo_professor = data[2];

    this.util.setStorage('isLogged', 'true');
    this.util.setStorage('showReserva', id_tipo_professor === 4 ? 'true' : 'fase');
    this.util.setStorage('logo', id_professor);
    this.util.setStorage('id_aluno', id_aluno);
    this.util.setStorage('id_professor', id_professor);

    //this.playerId(id_aluno);
    this.serieProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataSerie', data);
    })
    this.avaliacaoProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataAvaliacao', data);
    })
    this.graficoProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataGrafico', data);
    })
    this.treinoProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataTreino', data);
    })
    this.reservaProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataReserva', data);
    })
    this.informacaoProvider.indexInformacao(id_professor).subscribe(
      data => {
        this.util.setStorage('dataInformacao', data);
    })
    this.informacaoProvider.indexMensagem(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataMensagem', data);
    })
    this.navCtrl.push(DashboardPage);
  }

  forgotPassword() {
    const title = 'Esqueceu a senha?';
    const message = '';
    const inputs = [
      {
        name: 'login',
        placeholder: 'Login'
      }
    ]
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          this.doForgotPassword(data)
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      }
    ];
    this.util.showConfirmationAlert(title, message, inputs, buttons, false);
  }

  doForgotPassword(data) {
    if (this.util.checkNetwork()) {
      this.authProvider.forgotPassword(data).subscribe(
      data => {
        if (data == 1) {
          this.util.showAlert('Atenção', 'E-mail enviado com sucesso', 'Ok', false);
        } else {
          this.util.showAlert('Atenção', 'Não foi possível enviar o e-mail', 'Ok', false);
        }
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok', false);
    }
  }

  playerId(userId) {
    this.oneSignal.getIds().then(
      result => {
        const playerId = result.userId;
        const data = JSON.stringify({userId: userId, playerId: playerId});

        this.authProvider.playerId(data);
      });
  }

}
