import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';
import { SessionService } from '../resources/session.service';

const ACCOUNT_KEY = 'app.account';

@Injectable()
export class AccountService {
  public get isLoggedIn(): boolean { return !!this.account; }
  public get token(): string { return this.account && this.account.token; }
  public get authorizedId(): string { return this.account && this.account.authorized_id; }
  private account: User;

  constructor(
    private storage: Storage,
    private sessionService: SessionService,
  ) {
    this.getAccount();
  }

  login(credential: any) {
    return this.sessionService.create<User>(credential)
      .do(account => this.setAccount(account));
  }

  private setAccount(account: User) {
    this.account = account;
    this.storage.set(ACCOUNT_KEY, JSON.stringify(account));
  }

  private getAccount() {
    this.storage.get(ACCOUNT_KEY).then(value => this.account = JSON.parse(value));
  }
}
