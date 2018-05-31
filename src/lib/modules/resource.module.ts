import { NgModule } from '@angular/core';

import { CommentService } from '../resources/comment.service';
import { SessionService } from '../resources/session.service';
import { CurrentUserService } from '../resources/current-user.service';

@NgModule({
  providers: [
    CommentService,
    SessionService,
    CurrentUserService,
  ],
})
export class ResourceModule {}
