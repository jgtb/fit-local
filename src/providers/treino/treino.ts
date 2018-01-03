import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class TreinoProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_aluno) {
    const indexURL = '/serie/treinos-app?id_aluno=';
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).map(res => res.json());
  }

  create(data) {
    const createURL = '/serie/mensagem';
    const url = this.util.baseUrl + createURL;

<<<<<<< HEAD
    return this.http.post(url, data)
=======
    return this.http.post(url, data);
>>>>>>> 4ba2c8624a0b869986dd6d4fb42ad652ff866b79
  }

}
