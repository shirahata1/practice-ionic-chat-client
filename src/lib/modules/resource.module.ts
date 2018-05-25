import { NgModule } from '@angular/core';

import { CommentService } from '../resources/comment.service';
import { SessionService } from '../resources/session.service';

@NgModule({
  providers: [
    CommentService,
    SessionService,
  ],
})
export class ResourceModule {}
