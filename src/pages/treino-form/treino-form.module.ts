import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoFormPage } from './treino-form';

@NgModule({
  declarations: [
    TreinoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(TreinoFormPage),
  ],
})
export class TreinoAddPageModule {}
