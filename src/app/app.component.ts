import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { InformacaoPage } from '../pages/informacao/informacao';

import { OneSignal } from '@ionic-native/onesignal';
import { Badge } from '@ionic-native/badge';

import { Util } from '../util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = this.util.isLogged() ? DashboardPage : LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public util: Util,
    public oneSignal: OneSignal,
    public badge: Badge) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      
    });
  }

}
