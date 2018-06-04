import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
    private loadingController: LoadingController,
  ) {
  }

  ionViewWillEnter() {
    this.accountService.onLoggedIn$.subscribe(() => {
      if (this.accountService.isLoggedIn) { this.navCtrl.setRoot(ChatPage); }
    });
  }

  submit(){
    const loader = this.loadingController.create();
    loader.present();

    this.accountService.login(this.loginParams)
      .subscribe(
        user => {
          loader.dismiss();
          this.navCtrl.setRoot(ChatPage);
        },
        errors => {
          this.errors = errors;
          loader.dismiss();
        },
      );
  }

}
