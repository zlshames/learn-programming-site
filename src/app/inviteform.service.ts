import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Invitee } from './invitee'

@Injectable()
export class InviteformService {

  private apiURL: string = '/api/v1'

  constructor(private http: Http) { }

  sendSlackInvite(invitee: Invitee): Observable<Invitee> {
    return this.http.post(`${this.apiURL}/invite`, { invitee })
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
  }

  private extractData(res: Response): Object {
    let body = res.json();
    console.log(body)
    return body.message || body || { };
  }
}
