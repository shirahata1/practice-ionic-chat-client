import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { HomePage } from '../pages/home/home';
import { AccountService } from '../lib/services/account.service';
import { CurrentUserService } from '../lib/resources/current-user.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private fcm: FCM,
    private accountService: AccountService,
    private currentUserService: CurrentUserService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) { //browserで使うとエラーになるため
        this.accountService.onLoggedIn$.subscribe(() => {
          this.fcm.getToken().then(token => this.registerToken(token));
        });

        this.fcm.onTokenRefresh().filter(() => this.accountService.isLoggedIn).subscribe(token => this.registerToken(token));
      }
    });
  }

  private registerToken(token: string) {
    this.currentUserService.update({ notification_token: token }).subscribe();
  }
}
