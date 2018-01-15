import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { CommonModule } from '@angular/common'
import { NgCalendarModule  } from 'ionic2-calendar'
import { IonicImageLoader } from 'ionic-image-loader'

import { LoginPage } from '../pages/login/login'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { SeriePage } from '../pages/serie/serie'
import { TreinoPage } from '../pages/treino/treino'
import { TreinoFormPage } from '../pages/treino-form/treino-form'
import { TreinoTimerPage } from '../pages/treino-timer/treino-timer'
import { TreinoModalPage } from '../pages/treino-modal/treino-modal'
import { TreinoAddPage } from '../pages/treino-add/treino-add'
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao'
import { AvaliacaoViewPage } from '../pages/avaliacao-view/avaliacao-view'
import { GraficoPage } from '../pages/grafico/grafico'
import { ReservaPage } from '../pages/reserva/reserva'
import { RankingPage } from '../pages/ranking/ranking'
import { InformacaoPage } from '../pages/informacao/informacao'

import { RoundProgressModule } from 'angular-svg-round-progressbar'

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RoundProgressModule,
		NgCalendarModule,
		IonicImageLoader
	],
	declarations: [
		LoginPage,
    DashboardPage,
		SeriePage,
		TreinoPage,
		TreinoFormPage,
		TreinoTimerPage,
		TreinoModalPage,
		TreinoAddPage,
		AvaliacaoPage,
		AvaliacaoViewPage,
		GraficoPage,
		ReservaPage,
		RankingPage,
		InformacaoPage
  ],
	entryComponents: [
    LoginPage,
    DashboardPage,
		SeriePage,
		TreinoPage,
		TreinoFormPage,
		TreinoTimerPage,
		TreinoModalPage,
		TreinoAddPage,
		AvaliacaoPage,
		AvaliacaoViewPage,
		GraficoPage,
		ReservaPage,
		RankingPage,
		InformacaoPage
  ],
})
export class PagesModule {}
