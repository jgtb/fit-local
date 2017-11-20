import { Injectable } from '@angular/core'

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import { Util } from '../../util'

@Injectable()
export class GraficoSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS grafico(id VARCHAR(225), descricao VARCHAR(225), data VARCHAR(225), sessao VARCHAR(225), id_sessao VARCHAR(225), pergunta VARCHAR(225), id_pergunta VARCHAR(225), id_tipo_pergunta VARCHAR(225), resposta VARCHAR(225))'

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertAll(data) {
    let query = 'INSERT INTO grafico (id, descricao, data, sessao, id_sessao, pergunta, id_pergunta, id_tipo_pergunta, resposta) VALUES '
    let values = []
    let arrArgs = []

    for (let i = 0; i < data.length; i++) {

      arrArgs.push('(?, ?, ?, ?, ?, ?, ?, ?, ?)')

      values.push(data[i]['id'])
      values.push(data[i]['descricao'])
      values.push(data[i]['data'])
      values.push(data[i]['sessao'])
      values.push(data[i]['id_sessao'])
      values.push(data[i]['pergunta'])
      values.push(data[i]['id_pergunta'])
      values.push(data[i]['id_tipo_pergunta'])
      values.push(data[i]['resposta'])
    }

    query += arrArgs.join(', ')

    this.insert(query, values)
  }

  insert(query, values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql(query, values) }).then(() => console.log('Inserted All Grafico'))
  }

}
