import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { AccountService } from '../services/account.service';

export abstract class BaseService {
  collectionName: string;
  protected account: AccountService;
  protected apiUrl: string = `${SETTINGS['SERVICE_URL']}api/v1`;

  constructor(
    protected http: HttpClient,
  ) {}

  search<T>(params: any, options: any = {}): Observable<T> {
    const headers = this.getHeaders(options.header);

    return this.http.get<T>(this.getUrl(options.pathOptions), { headers: headers, params: params });
  }

  create<T>(params: any, options: any = {}): Observable<T> {
    const headers = this.getHeaders(options.header);

    return this.http.post<T>(this.getUrl(options.pathOptions), params, { headers: headers });
  }

  update<T>(id: number, params: any, options: any = {}): Observable<T> {
    const headers = this.getHeaders(options.header);

    return this.http
      .put<T>(this.getUrl(_.toString(id)), params, { headers: headers });
  }

  remove<T>(id: number, options: any = {}): Observable<T> {
    const headers = this.getHeaders(options.header);

    return this.http
      .delete<T>(this.getUrl(_.toString(id)), { headers: headers });
  }

  protected getUrl(...paths: string[]): string {
    return _.compact([this.apiUrl, this.collectionName, ...paths]).join('/');
  }

  protected getHeaders(options: any = {}): HttpHeaders {
    const account: AccountService = options.actor || this.account;

    const headers = {
      'Content-Type':  'application/json',
      'Authorization': '',
    };

    if (account && account.isLoggedIn) {
      headers['Authorization'] = `Bearer ${account.token}`;
    }

    return new HttpHeaders(headers);
  }
}
