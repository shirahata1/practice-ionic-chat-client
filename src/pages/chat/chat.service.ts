import { Subject } from 'rxjs/Rx';

export class ChatService {
  editingId$ = new Subject<number|void>();
}
