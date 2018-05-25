import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ChatService } from './chat.service';
import { AccountService } from '../../lib/services/account.service';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Comment {
  id?: number;
  body: string;
  created_at?: string;
}

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
    private http: HttpClient,
    public service: ChatService,
    public accountService: AccountService,
  ) {}

  ngOnInit() {
    // this.subscription = Observable.timer(0, 4000)
    //   .switchMap(_ =>this.http.get<Comment[]>(`${SETTINGS['SERVICE_URL']}api/v1/comments/`, { headers: this.getHeaders() }))
    //   .subscribe(comments => this.comments = comments );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  create() {
    this.http.post<Comment>(`${SETTINGS['SERVICE_URL']}api/v1/comments/`, this.newComment)
      .subscribe((comment) => {
        this.comments.unshift(comment);
        this.newComment['body'] = '';
      });
  }

  update(comment: Comment) {
    this.http.put<Comment>(`${SETTINGS['SERVICE_URL']}api/v1/comments/${comment.id}`, comment)
      .subscribe((updatedComment) => {
        const i = _.findIndex(this.comments, (_comment) => _comment.id === updatedComment.id);
        this.comments[i] = updatedComment;
      });
  }

  remove(comment: Comment) {
    this.http.delete<Comment>(`${SETTINGS['SERVICE_URL']}api/v1/comments/${comment.id}`)
      .subscribe((deletedComment) => {
        const i = _.findIndex(this.comments, (_comment) => _comment.id === deletedComment.id);
        this.comments.splice(i, 1);
      });
  }

  trackById(index: number, comment: Comment): number {
    return comment.id;
  }

  private getHeaders(): HttpHeaders {

    const headers = {
      'Content-Type':  'application/json',
    };

    return new HttpHeaders(headers);
  }

}
