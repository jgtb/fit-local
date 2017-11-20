import { Injectable } from '@angular/core'

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import { Util } from '../../util'

@Injectable()
export class SerieSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS serie(altura VARCHAR(225), ativo VARCHAR(225), carga VARCHAR(225), data VARCHAR(225), descricao VARCHAR(225), descricao_ex VARCHAR(225), id VARCHAR(225), id_exercicio VARCHAR(225), id_exercicio_serie VARCHAR(225), id_serie VARCHAR(225), id_tipo_exercicio VARCHAR(225), intervalo VARCHAR(225), largura VARCHAR(225), nota VARCHAR(225), num_repeticao VARCHAR(225), ordem VARCHAR(225), tipo_repeticao VARCHAR(225), video VARCHAR(225))'

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' })
  }

  insertAll(data) {
    let query = 'INSERT INTO serie (altura, ativo, carga, data, descricao, descricao_ex, id, id_exercicio, id_exercicio_serie, id_serie, id_tipo_exercicio, intervalo, largura, nota, num_repeticao, ordem, tipo_repeticao, video) VALUES '
    let values = []
    let arrArgs = []

    for (let i = 0; i < data.length; i++) {

      arrArgs.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')

      values.push(data[i]['altura'])
      values.push(data[i]['ativo'])
      values.push(data[i]['carga'])
      values.push(data[i]['data'])
      values.push(data[i]['descricao'])
      values.push(data[i]['descricao_ex'])
      values.push(data[i]['id'])
      values.push(data[i]['id_exercicio'])
      values.push(data[i]['id_exercicio_serie'])
      values.push(data[i]['id_serie'])
      values.push(data[i]['id_tipo_exercicio'])
      values.push(data[i]['intervalo'])
      values.push(data[i]['largura'])
      values.push(data[i]['nota'])
      values.push(data[i]['num_repeticao'])
      values.push(data[i]['ordem'])
      values.push(data[i]['tipo_repeticao'])
      values.push(data[i]['video'])
    }

    query += arrArgs.join(', ')

    this.insert(query, values)
  }

  insert(query, values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql(query, values) }).then(() => console.log('Inserted All Serie'))
  }

  updateCarga(id_serie, carga) {
    const values = [ carga, id_serie ]

    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('UPDATE serie SET carga = ? WHERE id_serie = ?', values) }).then(() => console.log('Updated Carga'))
  }

}
