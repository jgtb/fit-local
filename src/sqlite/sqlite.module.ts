import { NgModule } from '@angular/core'

import { UsuarioSQLite } from '../sqlite/usuario/usuario'
import { SerieSQLite } from '../sqlite/serie/serie'
import { AvaliacaoSQLite } from '../sqlite/avaliacao/avaliacao'
import { TreinoSQLite } from '../sqlite/treino/treino'
import { ReservaSQLite } from '../sqlite/reserva/reserva'
import { GraficoSQLite } from '../sqlite/grafico/grafico'
import { InformacaoSQLite } from '../sqlite/informacao/informacao'

@NgModule({
	providers: [
		UsuarioSQLite,
		SerieSQLite,
		AvaliacaoSQLite,
		TreinoSQLite,
		ReservaSQLite,
		GraficoSQLite,
		InformacaoSQLite
	]
})
export class SQLiteModule {}
