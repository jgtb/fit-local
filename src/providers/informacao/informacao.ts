import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class InformacaoProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  indexInformacao(id_professor) {
    const indexURL = '/fit/info?id_professor=';
    const url = this.util.baseUrl + indexURL + id_professor;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

  indexMensagem(id_aluno) {
    const indexURL = '/fit/mensagens?id_aluno=';
    const url = this.util.baseUrl + indexURL + id_aluno;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

}
