import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class GraficoSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS grafico(id VARCHAR(225), descricao VARCHAR(225), data VARCHAR(225), sessao VARCHAR(225), id_sessao VARCHAR(225), pergunta VARCHAR(225), id_pergunta VARCHAR(225), id_tipo_pergunta VARCHAR(225), resposta VARCHAR(225))';

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertAll(data) {
    for (var i = 0; i < data.length; i++) {
      let values = this.getValues(data[i]);

      this.insert(values);
    }
  }

  insert(values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO grafico (id, descricao, data, sessao, id_sessao, pergunta, id_pergunta, id_tipo_pergunta, resposta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Gráfico'));
  }

  getValues(data) {
    let id = data['id'];
    let descricao = data['descricao'];
    let _data = data['data'];
    let sessao = data['sessao'];
    let id_sessao = data['id_sessao'];
    let pergunta = data['pergunta'];
    let id_pergunta = data['id_pergunta'];
    let id_tipo_pergunta = data['id_tipo_pergunta'];
    let resposta = data['resposta'];

    let values = [ id, descricao, _data, sessao, id_sessao, pergunta, id_pergunta, id_tipo_pergunta, resposta ];

    return values;
  }

}
