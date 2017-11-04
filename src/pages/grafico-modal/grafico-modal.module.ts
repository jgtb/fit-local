import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoModalPage } from './grafico-modal';

@NgModule({
  declarations: [
    GraficoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoModalPage),
  ],
})
export class GraficoModalPageModule {}
