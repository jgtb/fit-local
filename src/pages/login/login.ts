import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { SerieProvider } from '../../providers/serie/serie';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { GraficoProvider } from '../../providers/grafico/grafico';
import { TreinoProvider } from '../../providers/treino/treino';
import { ReservaProvider } from '../../providers/reserva/reserva';
import { InformacaoProvider } from '../../providers/informacao/informacao';

import { UsuarioSQLite } from '../../sqlite/usuario/usuario';
import { SerieSQLite } from '../../sqlite/serie/serie';
import { AvaliacaoSQLite } from '../../sqlite/avaliacao/avaliacao';
import { GraficoSQLite } from '../../sqlite/grafico/grafico';
import { TreinoSQLite } from '../../sqlite/treino/treino';
import { ReservaSQLite } from '../../sqlite/reserva/reserva';
import { InformacaoSQLite } from '../../sqlite/informacao/informacao';

import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Util } from '../../util';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private data: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider: AuthProvider, public serieProvider: SerieProvider, public avaliacaoProvider: AvaliacaoProvider, public informacaoProvider: InformacaoProvider, public treinoProvider: TreinoProvider, public reservaProvider: ReservaProvider, public graficoProvider: GraficoProvider, public usuarioSQLite: UsuarioSQLite, public serieSQLite: SerieSQLite, public avaliacaoSQLite: AvaliacaoSQLite, public treinoSQLite: TreinoSQLite, public reservaSQLite: ReservaSQLite, public graficoSQLite: GraficoSQLite, public informacaoSQLite: InformacaoSQLite, public util: Util) {
    this.initForm();
  }

  ionViewDidEnter() {}

  ionViewDidLoad() {}

  initForm() {
    this.data = this.formBuilder.group({
      usuario: ['aluno', Validators.required],
      senha: ['aluno', Validators.required]
    });
  }

  login(data) {
    if (this.util.checkNetwork()) {
      this.authProvider.login(data).subscribe(
        data => {
          if (data) {
            this.doLogin(data);
          } else if (data == 0) {
            this.util.showAlert('Atenção', 'Usuário ou Senha estão Incorretos', 'Ok');
          } else if (data == -1) {
            this.util.showAlert('Atenção', 'Usuário Inativo', 'Ok');
          }
        },
        err => {
          this.util.showAlert('Atenção', 'Erro no Servidor', 'Tente Novamente');
        }
      );
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok');
    }
  }

  doLogin(data) {
    const id_aluno = data[0];
    const id_professor = data[1];
    const id_tipo_professor = data[2];
    this.util.setLogged();
    this.util.setShowReserva(id_tipo_professor);
    this.usuarioSQLite.insert(data);
    this.serieProvider.index(id_aluno).subscribe(
      data => {
        this.serieSQLite.insertAll(data);
    });
    this.avaliacaoProvider.index(id_aluno).subscribe(
      data => {
        this.avaliacaoSQLite.insertAll(data);
    });
    this.graficoProvider.index(id_aluno).subscribe(
      data => {
        this.graficoSQLite.insertAll(data);
    });
    this.treinoProvider.index(id_aluno).subscribe(
      data => {
        this.treinoSQLite.insertAll(data);
    });
    this.reservaProvider.index(id_aluno).subscribe(
      data => {
        this.reservaSQLite.insertAll(data);
    });
    this.informacaoProvider.indexInformacao(id_professor).subscribe(
      data => {
        this.informacaoSQLite.insertInformacao(data);
    });
    this.informacaoProvider.indexMensagem(id_aluno).subscribe(
      data => {
        this.informacaoSQLite.insertAllMensagem(data);
    });
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
    ];
    const buttons = [
      {
        text: 'Confirmar',
        handler: data => {
          this.doForgotPassword(data);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
     ];
    this.util.showConfirmationAlert(title, message, inputs, buttons);
  }

  doForgotPassword(data) {
    if (this.util.checkNetwork()) {
      this.authProvider.forgotPassword(data).subscribe(
      data => {
        if (data == 1) {
          this.util.showAlert('Atenção', 'E-mail enviado com sucesso', 'Ok');
        } else {
          this.util.showAlert('Atenção', 'Não foi possível enviar o e-mail', 'Ok');
        }
      });
    } else {
      this.util.showAlert('Atenção', 'Internet Offline', 'Ok');
    }
  }

}
