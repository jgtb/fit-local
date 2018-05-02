import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OneSignal } from '@ionic-native/onesignal';
import { Badge } from '@ionic-native/badge';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { SerieProvider } from '../../providers/serie/serie';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { AvaliacaoFormProvider } from '../../providers/avaliacao-form/avaliacao-form';
import { GraficoProvider } from '../../providers/grafico/grafico';
import { CalendarioProvider } from '../../providers/calendario/calendario';
import { ReservaProvider } from '../../providers/reserva/reserva';
import { RankingProvider } from '../../providers/ranking/ranking';
import { InformacaoProvider } from '../../providers/informacao/informacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { InformacaoPage } from '../../pages/informacao/informacao';

import { Layout } from '../../layout';
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
    public avaliacaoFormProvider: AvaliacaoFormProvider,
    public informacaoProvider: InformacaoProvider,
    public calendarioProvider: CalendarioProvider,
    public reservaProvider: ReservaProvider,
    public rankingProvider: RankingProvider,
    public graficoProvider: GraficoProvider,
    public oneSignal: OneSignal,
    public badge: Badge,
    public util: Util,
    public layout: Layout) {
      this.initForm();
    }

  initForm() {
    this.data = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['',  Validators.required]
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
    const id_usuario = data[5];
    const facebookId = data[6];
    const cores = data[7];
    const grupo = data[8];
    const hash = data[9];
    const app_id = data[10];
    const firebase_id = data[11];
    const plano = data[12];
    const filetime = data[13];
    
    this.util.setStorage('isLogged', 'true');
    this.util.setStorage('showReserva', id_tipo_professor === 4 ? 'true' : 'false');
    this.util.setStorage('showRanking', grupo !== 0? 'true': 'false');
    
    this.util.setStorage('id_aluno', id_aluno);
    this.util.setStorage('id_usuario', id_usuario);
    this.util.setStorage('id_professor', id_professor);
    this.util.setStorage('facebookId', facebookId === null ? 'assets/img/facebook.png' : facebookId);
    this.util.setStorage('hash', hash);
    this.util.setStorage('cores', cores);
    this.util.setStorage('plano', plano);
    this.util.setStorage('filetime', filetime);
    plano>1?this.util.setStorage('logo', id_professor):this.util.setStorage('logo', 1);

    this.setColors(cores.replace(/"/g,'').split(','));
    this.allowPushNotification(app_id, firebase_id);
    this.playerId(id_usuario);
    
    this.serieProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataSerie', data);
    });
    this.avaliacaoProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataAvaliacao', data);
    });
    this.avaliacaoFormProvider.index(id_professor).subscribe(
      data => {
        this.util.setStorage('dataAvaliacaoForm', data);
    });
    this.graficoProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataGrafico', data);
    });
    this.calendarioProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataTreino', data);
    });
    this.reservaProvider.index(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataReserva', data);
    });
    this.rankingProvider.index().subscribe(
      data => {
        this.util.setStorage('ranking', data);
      });
    this.informacaoProvider.indexInformacao(id_professor).subscribe(
      data => {
        this.util.setStorage('dataInformacao', data);
    });
    this.informacaoProvider.indexMensagem(id_aluno).subscribe(
      data => {
        this.util.setStorage('dataMensagem', data);
    });
    this.navCtrl.push(DashboardPage);
    this.navCtrl.setRoot(DashboardPage);
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

  allowPushNotification(app_id,firebase_id) {
    this.oneSignal.startInit(app_id, firebase_id);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      this.badge.increase(1);
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      this.badge.decrease(1);
      this.navCtrl.push(InformacaoPage);
    });
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.endInit();
  }
    

  playerId(userId) {
    this.oneSignal.getIds().then(
      result => {
        const playerId = result.userId;
        this.authProvider.playerId(userId, playerId).subscribe();
      });
  }

  setColors(cores){
    this.layout.colors = {
      dark:       cores[0],     //cor de fundo
      primary:    cores[1],     //cor dos botões
      secondary:  cores[2],     //cor da barra superior
      terciary:   cores[3],     //cor do botão da barra superior
      danger:     cores[4],     //cor dos ícones dos botões do menu e título
      light:      cores[5],     //cor do texto
      darklight:  cores[6]      //cor de fundo da lista
    }

    this.layout.loginColors = {
      secondary:  cores[2],
      danger:     cores[4],
      light:      cores[5],
      darklight:  cores[6]
    };
  }

}
