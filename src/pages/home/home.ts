import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AccountService } from '../../lib/services/account.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginParams = {
    authorized_id: '',
    password: '',
  }
  errors: any;

  constructor(
    public navCtrl: NavController,
    public accountService: AccountService,
  ) {
  }

  ionViewWillEnter() {
    this.accountService.onLoggedIn$.subscribe(() => {
      if (this.accountService.isLoggedIn) { this.navCtrl.setRoot(ChatPage); }
    });
  }

  submit(){
    this.accountService.login(this.loginParams)
      .subscribe(
        user => this.navCtrl.setRoot(ChatPage),
        errors => this.errors = errors,
      );
  }

}
