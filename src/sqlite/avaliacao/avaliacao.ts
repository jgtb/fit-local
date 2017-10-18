import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class AvaliacaoSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS avaliacao(id VARCHAR(225), descricao VARCHAR(225), data VARCHAR(225), sessao VARCHAR(225), id_sessao VARCHAR(225), pergunta VARCHAR(225), id_tipo_pergunta VARCHAR(225), resposta VARCHAR(225))';

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertAll(data) {
    for (var i = 0; i < data.length; i++) {
      let values = this.getValues(data);

      this.insert(values);
    }
  }

  insert(values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO avaliacao (id, descricao, data, sessao, id_sessao, pergunta, id_tipo_pergunta, resposta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Avaliação'));
  }

  getValues(data, i) {
    let id = data[i]['id'];
    let descricao = data[i]['descricao'];
    let _data = data[i]['data'];
    let sessao = data[i]['sessao'];
    let id_sessao = data[i]['id_sessao'];
    let pergunta = data[i]['pergunta'];
    let id_tipo_pergunta = data[i]['id_tipo_pergunta'];
    let resposta = data[i]['resposta'];

    let values = [ id, descricao, _data, sessao, id_sessao, pergunta, id_tipo_pergunta, resposta ];

    return values;
  }

}
