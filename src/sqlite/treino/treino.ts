import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class TreinoSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS treino( id VARCHAR(225),  title VARCHAR(225),  start VARCHAR(225),  end VARCHAR(225),  color VARCHAR(225),  description VARCHAR(225),  tempo VARCHAR(225),  borg VARCHAR(225))';

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
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO treino (id, title, start, end, color, description, tempo, borg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Treino'));
  }

  getValues(data, i) {
    let id = data[i]['id'];
    let title = data[i]['title'];
    let start = data[i]['start'];
    let end = data[i]['end'];
    let color = data[i]['color'];
    let description = data[i]['description'];
    let tempo = data[i]['tempo'];
    let borg = data[i]['borg'];

    let values = [ id, title, start, end, color, description, tempo, borg ];

    return values;
  }

}
