import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { SessionService } from '../../lib/resources/session.service';
import { User } from '../../lib/models/user.model';

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
    public sessionService: SessionService,
  ) {
  }

  ngOnInit() {
    if (1 != 1) { this.navCtrl.push(ChatPage); }
  }

  submit(){
    this.sessionService.create<User>(this.loginParams)
      .subscribe(user => console.dir(user));
  }

}
