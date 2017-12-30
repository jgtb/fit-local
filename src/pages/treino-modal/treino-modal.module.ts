import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoModalPage } from './treino-modal';

@NgModule({
  declarations: [
    TreinoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TreinoModalPage),
  ],
})
export class TreinoModalPageModule {}
