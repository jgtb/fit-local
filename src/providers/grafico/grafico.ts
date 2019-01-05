import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class GraficoProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_aluno) {
    const indexURL = '/fit/grafico?id_aluno=';
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

}
