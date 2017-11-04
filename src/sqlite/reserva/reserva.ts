import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class ReservaSQLite {

  createTable: string = 'CREATE TABLE IF NOT EXISTS reserva( id VARCHAR(225),  title VARCHAR(225),  color VARCHAR(225),  vagas VARCHAR(225),  tempo VARCHAR(225),  start VARCHAR(225),  end VARCHAR(225))';

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
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO reserva (id, title, color, vagas, tempo, start, end) VALUES (?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Reserva'));
  }

  getValues(data) {
    let id = data['id'];
    let title = data['title'];
    let color = data['color'];
    let vagas = data['vagas'];
    let tempo = data['tempo'];
    let start = data['start'];
    let end = data['end'];

    let values = [ id, title, color, vagas, tempo, start, end ];

    return values;
  }

}
