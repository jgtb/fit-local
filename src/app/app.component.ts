import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from '@ionic-native/onesignal';

import { AuthProvider } from '../providers/auth/auth';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { InformacaoPage } from '../pages/informacao/informacao';

import { Util } from '../util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = this.util.isLogged()?DashboardPage:LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public oneSignal: OneSignal,
    public authProvider: AuthProvider,
    public util: Util) {
    platform.ready().then(() => {
      this.appConfig();
      statusBar.styleDefault();
    });
  }

  appConfig() {
    const key = 'personal-group';

    this.authProvider.appConfig().subscribe(
      data => {
        const config = data.filter(elem => elem.key === key)[0];
        this.allowPushNotification(config);
    });
  }


  allowPushNotification(config) {
    this.oneSignal.startInit(config.oneSignalId, config.fireBaseId);
    this.oneSignal.handleNotificationOpened().subscribe(() => { 
      this.nav.push(InformacaoPage);
    });   
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.endInit();
  }

}
