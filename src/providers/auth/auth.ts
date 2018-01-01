import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Util } from '../../util';

@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public util: Util) {}

  login(data) {
    const loginURL = '/usuario/log';
    const url = this.util.baseUrl + loginURL;

    return this.http.post(url, data).map(res => res.json());
  }

  forgotPassword(data) {
    const forgotPasswordURL = '/usuario/senha-app';
    const url = this.util.baseUrl + forgotPasswordURL;

    return this.http.post(url, data).map(res => res.json());
  }

  playerId(data) {
    const oneSignalURL = '';
    const url = this.util.baseUrl + oneSignalURL;

    return this.http.post(url, data);
  }

  appConfig() {
    const url = 'assets/one-signal/data.json';

    return this.http.get(url).map(res => res.json());
  }

}
