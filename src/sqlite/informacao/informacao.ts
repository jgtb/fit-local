import { Injectable } from '@angular/core'

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import { Util } from '../../util'

@Injectable()
export class InformacaoSQLite {

  createTableInformacao: string = 'CREATE TABLE IF NOT EXISTS informacao(resumo VARCHAR(225), largura VARCHAR(225), altura VARCHAR(225), nome VARCHAR(225), email VARCHAR(225))'

  createTableMensagem: string = 'CREATE TABLE IF NOT EXISTS mensagem(id_mensagem VARCHAR(225), titulo VARCHAR(225), texto VARCHAR(225), imagem VARCHAR(225), largura VARCHAR(225), altura VARCHAR(225), data VARCHAR(225))'

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertInformacao(data) {
    let resumo = data[0]['resumo']
    let largura = data[0]['largura']
    let altura = data[0]['altura']
    let nome = data[0]['nome']
    let email = data[0]['email']

    let values = [ resumo, largura, altura, nome, email ]

    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO informacao (resumo, largura, altura, nome, email) VALUES (?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Informacao'))
  }

  insertAllMensagem(data) {
    let query = 'INSERT INTO mensagem (id_mensagem, titulo, texto, imagem, largura, altura, data) VALUES '
    let values = []
    let arrArgs = []

    for (let i = 0; i < data.length; i++) {

      arrArgs.push('(?, ?, ?, ?, ?, ?, ?)')

      values.push(data[i]['id_mensagem'])
      values.push(data[i]['titulo'])
      values.push(data[i]['texto'])
      values.push(data[i]['imagem'])
      values.push(data[i]['largura'])
      values.push(data[i]['altura'])
      values.push(data[i]['data'])
    }

    query += arrArgs.join(', ')

    this.insertMensagem(query, values)
  }

  insertMensagem(query, values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql(query, values) }).then(() => console.log('Inserted All Mensagem'))
  }

}
