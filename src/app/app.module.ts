import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';

import { PagesModule } from '../pages/pages.module';
import { ProvidersModule } from '../providers/providers.module';
import { SQLiteModule } from '../sqlite/sqlite.module';

import { HttpModule } from '@angular/http';

import { Util } from '../util';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PagesModule,
    ProvidersModule,
    SQLiteModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Util,
    SQLite,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
