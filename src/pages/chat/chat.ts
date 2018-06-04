import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ChatService,
    public accountService: AccountService,
    public commentService: CommentService,
    private loadingController: LoadingController,
  ) {}

  ionViewCanEnter(): boolean {
    return this.accountService.isLoggedIn;
  }

  ionViewDidLoad() {
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
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  create() {
    const loader = this.loadingController.create();
    loader.present();

    this.commentService.create<Comment>(this.newComment)
      .subscribe(
        (comment) => {
          this.comments.push(comment);
          this.comments.shift();
          this.newComment['body'] = '';
          loader.dismiss();
        },
        () => loader.dismiss(),
      );
  }

  update(comment: Comment) {
    const loader = this.loadingController.create();
    loader.present();

    this.commentService.update<Comment>(comment.id, comment)
      .subscribe(
        (updatedComment) => {
          const i = _.findIndex(this.comments, (_comment) => _comment.id === updatedComment.id);
          this.comments[i] = updatedComment;
        },
        () => loader.dismiss(),
      );
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
      if (!this.chatContent || !this.chatContent._scroll) { return; }
      this.chatContent.scrollToBottom(0);
    }, 100);
  }

}
