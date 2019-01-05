import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Util } from '../../util';

@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  login(data) {
    const loginURL = '/fit/log';
    const url = this.util.baseUrl + loginURL;

    return this.http.post(url, data).pipe(map((res: any) => res.json()));
  }

  forgotPassword(data) {
    const forgotPasswordURL = '/fit/senha-app';
    const url = this.util.baseUrl + forgotPasswordURL;

    return this.http.post(url, data).pipe(map((res: any) => res.json()));
  }

  playerId(userId, playerId) {
    const oneSignalURL = '/fit/player-id?id=' + userId + '&player_id=' + playerId;
    const url = this.util.baseUrl + oneSignalURL;

    return this.http.get(url);
  }

  isActive() {
    const ativoURL = '/fit/ativo?id=';
    const url = this.util.baseUrl + ativoURL + this.util.getStorage('id_aluno');

    return this.http.get(url);
  }

  filetime(id){
    const ativoURL = '/fit/filetime?id_professor=';
    const url = this.util.baseUrl + ativoURL + id;

    return this.http.get(url);

  }

}
