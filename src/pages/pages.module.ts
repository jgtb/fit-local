import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SeriePage } from '../pages/serie/serie';
import { TreinoPage } from '../pages/treino/treino';
import { TreinoFormPage } from '../pages/treino-form/treino-form';
import { TreinoTimerPage } from '../pages/treino-timer/treino-timer';
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { AvaliacaoViewPage } from '../pages/avaliacao-view/avaliacao-view';
import { GraficoPage } from '../pages/grafico/grafico';
import { ReservaPage } from '../pages/reserva/reserva';
import { InformacaoPage } from '../pages/informacao/informacao';

import { ComponentsModule } from '../components/components.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RoundProgressModule,
		ComponentsModule
	],
	declarations: [
		LoginPage,
    DashboardPage,
		SeriePage,
		TreinoPage,
		TreinoFormPage,
		TreinoTimerPage,
		AvaliacaoPage,
		AvaliacaoViewPage,
		GraficoPage,
		ReservaPage,
		InformacaoPage
  ],
	entryComponents: [
    LoginPage,
    DashboardPage,
		SeriePage,
		TreinoPage,
		TreinoFormPage,
		TreinoTimerPage,
		AvaliacaoPage,
		AvaliacaoViewPage,
		GraficoPage,
		ReservaPage,
		InformacaoPage
  ],
})
export class PagesModule {}
