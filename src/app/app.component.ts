import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { OneSignal } from "@ionic-native/onesignal"

import { UsuarioSQLite } from '../sqlite/usuario/usuario'
import { SerieSQLite } from '../sqlite/serie/serie'
import { AvaliacaoSQLite } from '../sqlite/avaliacao/avaliacao'
import { GraficoSQLite } from '../sqlite/grafico/grafico'
import { TreinoSQLite } from '../sqlite/treino/treino'
import { ReservaSQLite } from '../sqlite/reserva/reserva'
import { InformacaoSQLite } from '../sqlite/informacao/informacao'

import { LoginPage } from '../pages/login/login'
import { DashboardPage } from '../pages/dashboard/dashboard'

import { Util } from '../util'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage

  oneSignalID: string = 'aa67fa9c-474b-42ef-b968-75e451d8cb9b'
  fireBaseID: string = '937666658160'

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public oneSignal: OneSignal, public sqlite: SQLite, public usuarioSQLite: UsuarioSQLite, public serieSQLite: SerieSQLite, public avaliacaoSQLite: AvaliacaoSQLite, public graficoSQLite: GraficoSQLite, public treinoSQLite: TreinoSQLite, public reservaSQlite: ReservaSQLite, public informacaoSQLIte: InformacaoSQLite, public util: Util) {
    platform.ready().then(() => {
      this.allowPushNotification()
      this.createDatabase()
      this.setRoot()
      statusBar.styleDefault()
      splashScreen.hide()
    });
  }

  allowPushNotification() {
      this.oneSignal.startInit(this.oneSignalID, this.fireBaseID)

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)

      //this.oneSignal.handleNotificationReceived().subscribe(data => {
        //alert('Received');
      //});

      //this.oneSignal.handleNotificationOpened().subscribe(data => {
        //alert('Opened');
      //});

      this.oneSignal.endInit()
  }

  startDatabse() {
    return this.sqlite.create({ name: 'data.db', location: 'default' })
  }

  createDatabase() {
    this.startDatabse().then(
      (db: SQLiteObject) => {

        db.executeSql(this.usuarioSQLite.createTable, {})
        .then(() => console.log('Created Table Usuario'))

        db.executeSql(this.serieSQLite.createTable, {})
        .then(() => console.log('Created Table Serie'))

        db.executeSql(this.avaliacaoSQLite.createTable, {})
        .then(() => console.log('Created Table Avaliacao'))

        db.executeSql(this.graficoSQLite.createTable, {})
        .then(() => console.log('Created Table Gráfico'))

        db.executeSql(this.treinoSQLite.createTable, {})
        .then(() => console.log('Created Table Treino'))

        db.executeSql(this.reservaSQlite.createTable, {})
        .then(() => console.log('Created Table Reserva'))

        db.executeSql(this.informacaoSQLIte.createTableInformacao, {})
        .then(() => console.log('Created Table Informacao'))

        db.executeSql(this.informacaoSQLIte.createTableMensagem, {})
        .then(() => console.log('Created Table Mensagem'))

    });
  }

  setRoot() {
    if (this.util.isLogged()) {
      this.rootPage = DashboardPage
    } else {
      this.rootPage = LoginPage
    }
  }

}
