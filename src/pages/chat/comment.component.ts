import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../lib/models/comment.model';
import { ChatService } from './chat.service';
import { AccountService } from '../../lib/services/account.service';

@Component({
  selector: 'chat-comment',
  templateUrl: 'comment.component.html',
})
export class ChatCommentComponent {
  @Input() comment: Comment;
  @Input() isEditing: boolean = false;
  @Output() onUpdate = new EventEmitter<Comment>();
  @Output() onRemove = new EventEmitter<Comment>();
  newBody: string = '';

  constructor(
    public chatService: ChatService,
    private accountService: AccountService,
  ) {}

  edit() {
    this.newBody = this.comment.body;
    this.chatService.editingId$.next(this.comment.id);
  }

  remove() {
    this.onRemove.emit(this.comment);
  }

  cancel() {
    this.newBody = this.comment.body;
    this.chatService.editingId$.next();
  }

  update() {
    this.comment.body = this.newBody;
    this.chatService.editingId$.next();
    this.onUpdate.emit(this.comment);
  }

  isMine(): boolean {
    if (!this.comment.user) { return false; }
    return this.accountService.id === this.comment.user.id;
  }

}
