import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Util } from '../../util';

@Injectable()
export class InformacaoSQLite {

  createTableInformacao: string = 'CREATE TABLE IF NOT EXISTS informacao(resumo VARCHAR(225), largura VARCHAR(225), altura VARCHAR(225), nome VARCHAR(225), email VARCHAR(225))';

  createTableMensagem: string = 'CREATE TABLE IF NOT EXISTS mensagem(id_mensagem VARCHAR(225), titulo VARCHAR(225), texto VARCHAR(225), imagem VARCHAR(225), largura VARCHAR(225), altura VARCHAR(225), data VARCHAR(225))';

  constructor(public sqlite: SQLite, public util: Util) {}

  startDatabase() {
    return this.sqlite.create({ name: 'data.db', location: 'default' });
  }

  insertInformacao(data) {
    let resumo = data[0]['resumo'];
    let largura = data[0]['largura'];
    let altura = data[0]['altura'];
    let nome = data[0]['nome'];
    let email = data[0]['email'];

    let values = [ resumo, largura, altura, nome, email ];

    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO informacao (resumo, largura, altura, nome, email) VALUES (?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Informacao'));
  }

  insertAllMensagem(data) {
    for (var i = 0; i < data.length; i++) {
      let values = this.getMensagemValues(data, i);

      this.insertMensagem(values);
    }
  }

  insertMensagem(values) {
    this.startDatabase().then((db: SQLiteObject) => { db.executeSql('INSERT INTO mensagem (id_mensagem, titulo, texto, imagem, largura, altura, data) VALUES (?, ?, ?, ?, ?, ?, ?)', values) }).then(() => console.log('Inserted Mensagem'));
  }

  getMensagemValues(data, i) {
    let id_mensagem = data[i]['id_mensagem'];
    let titulo = data[i]['titulo'];
    let texto = data[i]['texto'];
    let imagem = data[i]['imagem'];
    let largura = data[i]['largura'];
    let altura = data[i]['altura'];
    let _data = data[i]['data'];

    let values = [ id_mensagem, titulo, texto, imagem, largura, altura, _data ];

    return values;
  }

}
