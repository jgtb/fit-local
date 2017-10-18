import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class ReservaProvider {

  constructor(public http: Http, public util: Util) {}

  index(id_professor) {
    const indexURL = "/aula/aulas?id_usuario=";
    const url = this.util.baseUrl + indexURL + id_professor;

    return this.http.get(url).map(res => res.json());
  }

  create(data) {
    const createURL = "";
    const url = this.util.baseUrl + createURL;

    return this.http.post(url, data).map(res => res.json());
  }

}
