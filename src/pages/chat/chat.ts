import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ChatService } from './chat.service';
import { HomePage } from '../home/home';
import { AccountService } from '../../lib/services/account.service';
import { CommentService } from '../../lib/resources/comment.service';
import { Comment } from '../../lib/models/comment.model';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [ChatService],
})
export class ChatPage implements OnInit, OnDestroy {
  subscription: Subscription;
  comments: Comment[] = [];
  newComment: Comment = { body: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ChatService,
    public accountService: AccountService,
    public commentService: CommentService,
  ) {}

  ngOnInit() {
    this.subscription = Observable.timer(0, 4000)
      .switchMap(_ => this.commentService.search<Comment[]>({}))
      .map(comments => _.reverse(comments))
      .subscribe(comments => this.comments = comments);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  create() {
    this.commentService.create<Comment>(this.newComment)
      .subscribe((comment) => {
        this.comments.push(comment);
        this.newComment['body'] = '';
      });
  }

  update(comment: Comment) {
    this.commentService.update<Comment>(comment.id, comment)
      .subscribe((updatedComment) => {
        const i = _.findIndex(this.comments, (_comment) => _comment.id === updatedComment.id);
        this.comments[i] = updatedComment;
      });
  }

  remove(comment: Comment) {
    this.commentService.remove<Comment>(comment.id)
      .subscribe((deletedComment) => {
        const i = _.findIndex(this.comments, (_comment) => _comment.id === deletedComment.id);
        this.comments.splice(i, 1);
      });
  }

  trackById(index: number, comment: Comment): number {
    return comment.id;
  }

  logout() {
    this.accountService.logout()
      .then(() => this.navCtrl.setRoot(HomePage));
  }

}
