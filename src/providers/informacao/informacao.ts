import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class InformacaoProvider {

  constructor(public http: Http, public util: Util) {}

  indexInformacao(id_professor) {
    const indexURL = "/usuario/info?id_professor=";
    const url = this.util.baseUrl + indexURL + id_professor;

    return this.http.get(url).map(res => res.json());
  }

  indexMensagem(id_aluno) {
    const indexURL = "/mensagem/mensagens?id_aluno=";
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).map(res => res.json());
  }

}
