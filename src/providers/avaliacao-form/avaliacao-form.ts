import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class AvaliacaoFormProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_professor) {
    const indexURL = '/avaliacao/avaliacao-app?id=';
    const url = this.util.baseUrl + indexURL + id_professor;
    console.log(url)
    return this.http.get(url).map(res => res.json());
  }

}
