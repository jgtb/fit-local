import { NgModule } from '@angular/core';

import { AuthProvider } from '../providers/auth/auth';
import { SerieProvider } from '../providers/serie/serie';
import { AvaliacaoProvider } from '../providers/avaliacao/avaliacao';
import { AvaliacaoFormProvider } from '../providers/avaliacao-form/avaliacao-form';
import { TreinoProvider } from '../providers/treino/treino';
import { GraficoProvider } from '../providers/grafico/grafico';
import { ReservaProvider } from '../providers/reserva/reserva';
import { InformacaoProvider } from '../providers/informacao/informacao';

@NgModule({
	providers: [
		AuthProvider,
		SerieProvider,
		AvaliacaoProvider,
		AvaliacaoFormProvider,
		TreinoProvider,
		GraficoProvider,
		ReservaProvider,
		InformacaoProvider
	]
})
export class ProvidersModule {}
