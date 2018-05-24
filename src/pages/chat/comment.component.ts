import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from './chat';
import { ChatService } from './chat.service';

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

}
