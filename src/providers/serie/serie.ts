import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class SerieProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_aluno) {
    const indexURL = '/fit/treinos?id_aluno=' + id_aluno;
    const url = this.util.baseUrl + indexURL;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

  updateCarga(data) {
  	const updateCargaURL = '/fit/atualiza';
    const url = this.util.baseUrl + updateCargaURL;

    return this.http.post(url, data);
  }

}
