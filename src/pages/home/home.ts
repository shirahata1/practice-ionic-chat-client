import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AccountService } from '../../lib/services/account.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loginParams = {
    authorized_id: '',
    password: '',
  }

  constructor(
    public navCtrl: NavController,
    public accountService: AccountService,
  ) {
  }

  ngOnInit() {
    console.log(this.accountService.isLoggedIn);
    if (this.accountService.isLoggedIn) { this.navCtrl.setRoot(ChatPage); }
  }

  submit(){
    this.accountService.login(this.loginParams)
      .subscribe(user => this.navCtrl.setRoot(ChatPage));
  }

}
