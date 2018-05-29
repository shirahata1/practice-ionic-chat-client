import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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
export class ChatPage {
  comments: Comment[] = [];
  newComment: Comment = { body: '' };
  private subscription: Subscription;
  private searchQuery: { [key:string]: any } = {
    limit: 20,
  };
  @ViewChild(Content) chatContent: Content;
  pagingEnabled = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ChatService,
    public accountService: AccountService,
    public commentService: CommentService,
  ) {}

  ionViewCanEnter(): boolean {
    return this.accountService.isLoggedIn;
  }

  ionViewDidEnter() {
    const polling = Observable.timer(4000, 4000)
      .switchMap(_ => this.commentService.search<Comment[]>(this.searchQuery))
      .map(comments => _.reverse(comments));

    this.commentService.search<Comment[]>({})
      .map(comments => _.reverse(comments))
      .subscribe(comments => {
        this.comments = comments;
        this.scrollToBottom();
        this.subscription = polling.subscribe(comments => this.comments = comments);
      });
  }

  ionViewWillLeave() {
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
      .subscribe(() => {
        const i = _.findIndex(this.comments, (_comment) => _comment.id === comment.id);
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

  onScrollTop(infiniteScroll: any) {
    infiniteScroll.enable(false);
    this.searchQuery.limit = this.searchQuery.limit + 20;
    this.commentService.search<Comment[]>(this.searchQuery)
      .map(comments => _.reverse(comments))
      .subscribe(comments => {
        infiniteScroll.enable(this.comments.length != comments.length);
        this.comments = comments;
        infiniteScroll.complete();
      });
  }

  private scrollToBottom() {
    // wait for this issue: https://github.com/ionic-team/ionic/issues/12309
    setTimeout(() => {
      this.chatContent.scrollToBottom().then(() => this.pagingEnabled = true);
    }, 400);
  }

}
