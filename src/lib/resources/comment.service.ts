import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { AccountService } from '../services/account.service';

@Injectable()
export class CommentService extends BaseService {
  constructor(
    account: AccountService,
    protected http: HttpClient,
  ) {
    super(http);
    this.account = account;
    this.collectionName = 'comments';
  }
}
