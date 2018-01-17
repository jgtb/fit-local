import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoTimerPage } from './treino-timer';

@NgModule({
  declarations: [
    TreinoTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(TreinoTimerPage),
  ],
})
export class TreinoTimerPageModule {}
