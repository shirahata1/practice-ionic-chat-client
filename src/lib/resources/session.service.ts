import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class SessionService extends BaseService {
  constructor(
    protected http: HttpClient,
  ) {
    super(http);
    this.collectionName = 'login';
  }
}
