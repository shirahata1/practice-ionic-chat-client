import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
  public get isLoggedIn(): boolean { return !!this.account; }
  public get token(): string { return this.account && this.account.token; }
  private account: User;
}
