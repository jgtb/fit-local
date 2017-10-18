import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class AvaliacaoProvider {

  constructor(public http: Http, public util: Util) {}

  index(id_aluno) {
    const indexURL = "/avaliacao-aluno/lista?id_aluno=";
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).map(res => res.json());
  }

}
