import { NgModule } from '@angular/core';

import { UsuarioSQLite } from '../sqlite/usuario/usuario';
import { SerieSQLite } from '../sqlite/serie/serie';
import { AvaliacaoSQLite } from '../sqlite/avaliacao/avaliacao';
import { InformacaoSQLite } from '../sqlite/informacao/informacao';

@NgModule({
	providers: [
		UsuarioSQLite,
		SerieSQLite,
		AvaliacaoSQLite,
		InformacaoSQLite
	]
})
export class SQLiteModule {}
