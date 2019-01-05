import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class ReservaProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  index(id_professor) {
    const indexURL = '/fit/aulas?id_usuario=';
    const url = this.util.baseUrl + indexURL + id_professor;

    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

  create(data) {
    const createURL = '/fit/reservar';
    const url = this.util.baseUrl + createURL;

    return this.http.post(url, data);
  }

  checkIsReservado(data) {
    const checkReservadoURL = '/fit/reservado?id_aula=' + data.id + '&id_aluno=' + this.util.getStorage('id_aluno');
    const url = this.util.baseUrl + checkReservadoURL;

    return this.http.get(url, data);
  }

  checkIsLotado(data) {
    const checkLotadoURL = '/fit/reservas?id=';
    const url = this.util.baseUrl + checkLotadoURL + data.id;

    return this.http.get(url, data).pipe(map((res: any) => res.json()));
  }

  delete(data) {
    const deleteURL = '/fit/cancelar';
    const url = this.util.baseUrl + deleteURL;

    return this.http.post(url, data);
  }

}
