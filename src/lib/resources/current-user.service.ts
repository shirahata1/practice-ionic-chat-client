import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { AccountService } from '../services/account.service';

@Injectable()
export class CurrentUserService extends BaseService {
  constructor(
    account: AccountService,
    protected http: HttpClient,
  ) {
    super(http);
    this.account = account;
    this.collectionName = 'current_user';
  }

  update<T>(params: any, options: any = {}): Observable<T> {
    const headers = this.getHeaders(options.header);

    return this.http
      .put<T>(this.getUrl(), params, { headers: headers });
  }
}
