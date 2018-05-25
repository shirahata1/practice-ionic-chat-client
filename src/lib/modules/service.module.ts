import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

import { ResourceModule } from './resource.module';
import { AccountService } from '../services/account.service';

@NgModule({
  imports: [
    ResourceModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AccountService,
  ],
})
export class ServiceModule {}
