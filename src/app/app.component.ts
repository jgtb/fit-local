import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { UsuarioSQLite } from '../sqlite/usuario/usuario';
import { SerieSQLite } from '../sqlite/serie/serie';
import { AvaliacaoSQLite } from '../sqlite/avaliacao/avaliacao';
import { InformacaoSQLite } from '../sqlite/informacao/informacao';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { Util } from '../util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sqlite: SQLite, public usuarioSQLite: UsuarioSQLite, public serieSQLite: SerieSQLite, public avaliacaoSQLite: AvaliacaoSQLite, public informacaoSQLIte: InformacaoSQLite, public util: Util) {
    platform.ready().then(() => {
      this.util.setLogout();
      this.createDatabase();
      this.setRoot();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  startDatabse() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  createDatabase() {
    this.startDatabse().then(
      (db: SQLiteObject) => {

        db.executeSql(this.usuarioSQLite.createTable, {})
        .then(() => console.log('Created Usuario'));

        db.executeSql(this.serieSQLite.createTable, {})
        .then(() => console.log('Created Serie'));

        db.executeSql(this.avaliacaoSQLite.createTable, {})
        .then(() => console.log('Created Avaliacao'));

        db.executeSql(this.informacaoSQLIte.createTableInformacao, {})
        .then(() => console.log('Created Informacao'));

        db.executeSql(this.informacaoSQLIte.createTableMensagem, {})
        .then(() => console.log('Created Mensagem'));

    });
  }

  setRoot() {
    if (!this.util.isLogged()) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = DashboardPage;
    }
  }

}
