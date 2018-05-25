import { NgModule } from '@angular/core';

import { ResourceModule } from './resource.module';
import { AccountService } from '../services/account.service';

@NgModule({
  imports: [
    ResourceModule,
  ],
  providers: [
    AccountService,
  ],
})
export class ServiceModule {}
