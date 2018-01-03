import { Injectable } from '@angular/core'

import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

import { Util } from '../../util'

@Injectable()
export class TreinoProvider {

  constructor(public http: Http, public util: Util) {}

  index(id_aluno) {
    const indexURL = "/serie/treinos-app?id_aluno="
    const url = this.util.baseUrl + indexURL + id_aluno

    return this.http.get(url).map(res => res.json())
  }

  create(data) {
    const createURL = "/serie/mensagem"
    const url = this.util.baseUrl + createURL

    return this.http.post(url, data)
  }

}
