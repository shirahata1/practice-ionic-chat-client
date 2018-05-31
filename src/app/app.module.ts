import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { FCM } from '@ionic-native/fcm';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ServiceModule } from '../lib/modules/service.module';
import { ResourceModule } from '../lib/modules/resource.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ChatPageModule,
    IonicModule.forRoot(MyApp),
    ServiceModule,
    ResourceModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
