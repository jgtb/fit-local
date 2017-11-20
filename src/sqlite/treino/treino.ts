import { Injectable } from '@angular/core'

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import { Util } from '../../util'

@Injectable()
export class TreinoSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS treino( id VARCHAR(225),  title VARCHAR(225),  start VARCHAR(225),  end VARCHAR(225),  color VARCHAR(225),  description VARCHAR(225),  tempo VARCHAR(225),  borg VARCHAR(225))'

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' })
  }

  insertAll(data) {
    let query = 'INSERT INTO treino (id, title, start, end, color, description, tempo, borg) VALUES '
    let values = []
    let arrArgs = []

    for (let i = 0; i < data.length; i++) {

      arrArgs.push('(?, ?, ?, ?, ?, ?, ?, ?)')

      values.push(data[i]['id'])
      values.push(data[i]['title'])
      values.push(data[i]['start'])
      values.push(data[i]['end'])
      values.push(data[i]['color'])
      values.push(data[i]['description'])
      values.push(data[i]['tempo'])
      values.push(data[i]['borg'])
    }

    query += arrArgs.join(', ')

    this.insert(query, values)
  }

  insert(query, values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql(query, values) }).then(() => console.log('Inserted All Serie'))
  }

}
