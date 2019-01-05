import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class AvaliacaoFormProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_professor) {
    const indexURL = '/fit/avaliacao-app?id=';
    const url = this.util.baseUrl + indexURL + id_professor;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

  save(data) {
    const indexURL = '/fit/salvar-app';
    const url = this.util.baseUrl + indexURL;

    let headers = new Headers();
    headers.append('Authorization', this.util.getStorage('hash'));
    console.log(headers);
    return this.http.post(url, data, new RequestOptions({ headers: headers }));
  }

}
