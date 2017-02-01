import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Invitee } from './invitee'

@Injectable()
export class InviteformService {

  private apiURL: string = '/api/v1'
  private slackToken: string
  private slackHost: string

  constructor(private http: Http) { 
    this.slackToken = 'xoxp-133113936981-133716968327-135202434869-282927558aef66b633b3e27a9cb5c748'
    this.slackHost = 'barracudainc'
  }

  postInvitee(invitee: Invitee): Observable<Invitee> {
    return this.http.post(`${this.apiURL}/newinvite`, { invitee })
      .map(this.extractData)
      .catch(this.handleError)
  }

  sendSlackInvite(email: string) {
    return this.http.get(`https://${this.slackHost}.slack.com/api/users.admin.invite?token=${this.slackToken}&email=${email}`)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response): Object {
    let body = res.json();
    console.log(body)
    return body.message || body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
