import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class AvaliacaoProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_aluno) {
    const indexURL = '/avaliacao-aluno/lista?id_aluno=';
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).map(res => res.json());
  }

  delete(data) {
    const indexURL = '/avaliacao-aluno/desativar-app';
    const url = this.util.baseUrl + indexURL;

    let headers = new Headers();
    headers.append('Authorization', this.util.getStorage('hash'));

    return this.http.post(url, data, new RequestOptions({ headers: headers }));
    
  }

}
