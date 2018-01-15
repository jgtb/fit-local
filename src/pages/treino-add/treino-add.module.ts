import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreinoAddPage } from './treino-add';

@NgModule({
  declarations: [
    TreinoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TreinoAddPage),
  ],
})
export class TreinoAddPageModule {}
