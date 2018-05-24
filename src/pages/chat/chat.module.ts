import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatCommentComponent } from './comment.component';

@NgModule({
  declarations: [
    ChatPage,
    ChatCommentComponent,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
