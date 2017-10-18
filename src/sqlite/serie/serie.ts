import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class SerieSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS serie(altura VARCHAR(225), ativo VARCHAR(225), carga VARCHAR(225), data VARCHAR(225), descricao VARCHAR(225), descricao_ex VARCHAR(225), id VARCHAR(225), id_exercicio VARCHAR(225), id_exercicio_serie VARCHAR(225), id_serie VARCHAR(225), id_tipo_exercicio VARCHAR(225), intervalo VARCHAR(225), largura VARCHAR(225), nota VARCHAR(225), num_repeticao VARCHAR(225), ordem VARCHAR(225), tipo_repeticao VARCHAR(225), video VARCHAR(225))';

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertAll(data) {
    for (var i = 0; i < data.length; i++) {
      let values = this.getValues(data, i);

      this.insert(values);
    }
  }

  insert(values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO serie (altura, ativo, carga, data, descricao, descricao_ex, id, id_exercicio, id_exercicio_serie, id_serie, id_tipo_exercicio, intervalo, largura, nota, num_repeticao, ordem, tipo_repeticao, video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Serie'));
  }

  getValues(data, i) {
    let altura = data[i]['altura'];
    let ativo = data[i]['ativo'];
    let carga = data[i]['carga'];
    let _data = data[i]['data'];
    let descricao = data[i]['descricao'];
    let descricao_ex = data[i]['descricao_ex'];
    let id = data[i]['id'];
    let id_exercicio = data[i]['id_exercicio'];
    let id_exercicio_serie = data[i]['id_exercicio_serie'];
    let id_serie = data[i]['id_serie'];
    let id_tipo_exercicio = data[i]['id_tipo_exercicio'];
    let intervalo = data[i]['intervalo'];
    let largura = data[i]['largura'];
    let nota = data[i]['nota'];
    let num_repeticao = data[i]['num_repeticao'];
    let ordem = data[i]['ordem'];
    let tipo_repeticao = data[i]['tipo_repeticao'];
    let video = data[i]['video'];

    let values = [ altura, ativo, carga, _data, descricao, descricao_ex, id, id_exercicio, id_exercicio_serie, id_serie, id_tipo_exercicio, intervalo, largura, nota, num_repeticao, ordem, tipo_repeticao, video ];

    return values;
  }

  updateCarga(id_serie, carga) {
    const values = [ carga, id_serie ];

    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('UPDATE serie SET carga = ? WHERE id_serie = ?', values) }).then(() => console.log('Updated Carga'));
  }

}
